"use client";

import { Render, type Data } from "@puckeditor/core";
import { puckConfig, sanitizePuckData } from "../puck.config";
import { ChannelNetwork } from "./channel-network";
import { ChatWidget } from "./chat-widget";
import { Contact } from "./contact";
import { Cursor } from "./effects/cursor";
import { ScrollProgress } from "./effects/scroll-progress";
import { SmoothScroll } from "./effects/smooth-scroll";
import { Faq } from "./faq";
import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";
import { Impact } from "./impact";
import { Marquee } from "./marquee";
import { Pricing } from "./pricing";
import { Process } from "./process";
import { Services } from "./services";
import { Stats } from "./stats";
import { Tracker } from "./tracker";

function hasContent(data: Data | null): data is Data {
  return Boolean(
    data &&
      Array.isArray((data as { content?: unknown[] }).content) &&
      ((data as { content: unknown[] }).content.length ?? 0) > 0,
  );
}

export function PageClient({ data }: { data: Data | null }) {
  const safe = sanitizePuckData(data);
  return (
    <SmoothScroll>
      <Header />
      <ScrollProgress />
      <main>
        {hasContent(safe) ? (
          <Render config={puckConfig} data={safe} />
        ) : (
          <>
            <Hero />
            <Marquee />
            <Stats />
            <Services />
            <ChannelNetwork />
            <Pricing />
            <Process />
            <Impact />
            <Faq />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <ChatWidget />
      <Tracker />
      <Cursor />
    </SmoothScroll>
  );
}
