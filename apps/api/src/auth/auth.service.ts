import {
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthService implements OnModuleInit {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  /** Seed tài khoản admin từ env nếu chưa tồn tại. */
  async onModuleInit() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) {
      this.logger.warn('Thiếu ADMIN_EMAIL/ADMIN_PASSWORD — bỏ qua seed admin');
      return;
    }
    const passwordHash = await hash(password, 10);
    const existing = await this.prisma.adminUser.findUnique({
      where: { email },
    });
    if (!existing) {
      await this.prisma.adminUser.create({
        data: { email, passwordHash },
      });
      this.logger.log(`Đã seed tài khoản admin: ${email}`);
      return;
    }
    await this.prisma.adminUser.update({
      where: { email },
      data: { passwordHash },
    });
    this.logger.log(`Đã đồng bộ mật khẩu admin: ${email}`);
  }

  async login(email: string, password: string) {
    const user = email
      ? await this.prisma.adminUser.findUnique({ where: { email } })
      : null;
    const valid = user && (await compare(password ?? '', user.passwordHash));
    if (!valid) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }
    return {
      accessToken: await this.jwt.signAsync({
        sub: user.id,
        email: user.email,
      }),
    };
  }
}
