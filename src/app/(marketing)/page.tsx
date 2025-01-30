"use client";  

import { Container, Icons, Wrapper } from "@/components";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SectionBadge from "@/components/ui/section-badge";
import { features, perks, pricingCards } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight, UserIcon, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const HomePage = () => {

    const [walletAddress, setWalletAddress] = useState("");
    const handleTrackingClick = () => {

        if (walletAddress) {
            window.location.href = `insights/${walletAddress}`;
        }

    };
    return (
        <section  className="w-full relative flex items-center justify-center flex-col px-4 md:px-0 py-8">
                {/* Hero */}
              <Wrapper>
                <Container id="about">
                <div className="flex flex-col items-center justify-center py-20 h-full">
                        <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
                            <span>
                                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
                            </span>
                            <span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
                            <span className="h-full w-full blur-md absolute bottom-0 inset-x-0 bg-gradient-to-tr from-primary/40"></span>
                            <span className="z-10 py-0.5 text-sm text-neutral-100 flex items-center justify-center gap-1.5">
                                <Image src="/icons/sparkles-dark.svg" alt="✨" width={24} height={24} className="w-4 h-4" />
                                Introducing BigFish WhaleTracker
                                <ChevronRight className="w-4 h-4" />
                            </span>
                        </button>
                        <div className="flex flex-col items-center mt-8 max-w-3xl w-11/12 md:w-full">
                            <h1 className="text-4xl md:text-6xl lg:textxl md:!leading-snug font-semibold text-center bg-clip-text bg-gradient-to-b from-gray-50 to-gray-50 text-transparent">
                            Track NFT Whales, Make Smarter Investments
                            </h1>
                            <p className="text-base md:text-lg text-foreground/80 mt-6 text-center">
                            Get real-time insights into the activities of high-value NFT traders and holders in the NFT marketplace.
                            </p>
                            <div className="hidden md:flex relative items-center justify-center mt-8 md:mt-12 w-full">
                            <div className="flex items-center justify-center w-max rounded-full border-t border-foreground/30 bg-white/15 backdrop-blur-lg px-2 py-1 md:py-2 gap-2 md:gap-8 shadow-3xl shadow-background/40 cursor-pointer select-none">

                            <p className="ml-2"> 🐋</p>
                            <input type="text" value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)}
                                placeholder="Enter your wallet address"
                                className="text-foreground text-sm text-center md:text-base font-medium pr-4 lg:pr-0 bg-transparent placeholder:text-foreground/50 focus:outline-none" />
                            <Button
                                size="sm"
                                onClick={handleTrackingClick}
                                className="rounded-full bg-blue-600 hidden lg:flex border border-foreground/20">
                                Start Tracking Now
                                <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                            </div>
                        </div>
                        </div>
                        <div className="relative flex items-center py-10 md:py-20 w-full">
                            <div className="absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 h-3/4 -translate-y-1/2 inset-0 blur-[10rem]"></div>
                            <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
                                <Image
                                    src="/assets/dashboard.svg"
                                    alt="banner image"
                                    width={1200}
                                    height={1200}
                                    quality={100}
                                    className="rounded-md lg:rounded-xl bg-foreground/10 shadow-2xl ring-1 ring-border"
                                />

                                <BorderBeam size={250} duration={12} delay={9} />
                            </div>
                        </div>
                    </div>    
                </Container>
              </Wrapper>
                
                {/* How it works */}
                <Wrapper className="flex flex-col items-center justify-center py-12 relative">
                <Container id="how">
                    <div className="max-w-md mx-auto text-start md:text-center">
                        <SectionBadge title="Step-by-Step Process" />
                        <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
                            Your Guide to Tracking NFT Whales
                        </h2>
                        <p className="text-muted-foreground mt-6">
                            Follow these simple steps to stay ahead in the NFT market.
                        </p>
                    </div>
                </Container>
                <Container>
                    <div className="flex flex-col items-center justify-center py-10 md:py-20 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full divide-x-0 md:divide-x divide-y md:divide-y-0 divide-gray-900 first:border-l-2 lg:first:border-none first:border-gray-900">
                            {perks.map((perk) => (
                                <div key={perk.title} className="flex flex-col items-start px-4 md:px-6 lg:px-8 lg:py-6 py-4">
                                    <div className="flex items-center justify-center">
                                        <perk.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-medium mt-4">
                                        {perk.title}
                                    </h3>
                                    <p className="text-muted-foreground mt-2 text-start lg:text-start">
                                        {perk.info}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Wrapper>
                 
                 {/* Features */}
                 <Wrapper className="flex flex-col items-center justify-center py-12 relative">
                <div className="hidden md:block absolute top-0 -right-1/3 w-72 h-72 bg-primary rounded-full blur-[10rem] -z-10"></div>
                <div className="hidden md:block absolute bottom-0 -left-1/3 w-72 h-72 bg-indigo-600 rounded-full blur-[10rem] -z-10"></div>
                <Container id="features">
                    <div className="max-w-md mx-auto text-start md:text-center">
                        <SectionBadge title="Features" />
                        <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
                            Discover our powerful features
                        </h2>
                        <p className="text-muted-foreground mt-6">
                        Powerful Features to Help You Track NFT Whales
                        </p>
                    </div>
                </Container>
                <Container>
                    <div className="flex items-center justify-center mx-auto mt-8">
                    <Image
                                    src="/assets/feature.gif"
                                    alt="banner image"
                                    width={250}
                                    height={150}
                                    quality={100}
                                    className="rounded-md lg:rounded-xl"
                                />
                    </div>
                </Container>
                <Container> 
                <div className="flex flex-col items-center justify-center py-10 md:py-20 w-full">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-8">
        {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-start lg:items-start px-0 md:px-0">
                <div className="flex items-center justify-center">
                    <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium mt-4">
                    {feature.title}
                </h3>
                <p className="text-muted-foreground mt-2 text-start lg:text-start">
                    {feature.info}
                </p>
                <Link
                    href={
                        feature.title === "NFT Market Report" ? "/report" :
                        feature.title === "Whale Identification for NFT marketplace" ? "/whale" :
                        feature.title === "Whale Portfolio Insights" ? "/insights" :
                        feature.title === "Whale Movement Alerts" ? "/movement" : "#"
                    }
                >
                    <button className="mt-4 px-4 py-2 rounded-full text-black bg-white hover:bg-white/90">
                        Get Started
                    </button>
                </Link>
            </div>
        ))}
    </div>
</div>
            </Container>
            </Wrapper>
                
                 {/* pricing */}
            <Wrapper className="flex flex-col items-center justify-center py-12 relative">
                <div className="hidden md:block absolute top-0 -right-1/3 w-72 h-72 bg-blue-500 rounded-full blur-[10rem] -z-10"></div>
                <Container id="pricing">
                    <div className="max-w-md mx-auto text-start md:text-center">
                        <SectionBadge title="Pricing" />
                        <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
                            Unlock the right plan for your future
                        </h2>
                        <p className="text-muted-foreground mt-6">
                            Choose the Plan That Fits You
                        </p>
                    </div>
                </Container>
                <Container className="flex items-center justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full md:gap-8 py-10 md:py-20 flex-wrap max-w-4xl">
                        {pricingCards.map((card) => (
                            <Card
                                key={card.title}
                                className={cn("flex flex-col w-full border-neutral-700",
                                    card.title === "Pro plan" && "border-2 border-primary"
                                )}
                            >
                                <CardHeader className="border-b border-border">
                                    <span>
                                        {card.title}
                                    </span>
                                    <CardTitle className={cn(card.title !== "Pro plan" && "text-muted-foreground")}>
                                        {card.price}
                                    </CardTitle>
                                    <CardDescription>
                                        {card.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-3">
                                    {card.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-2">
                                            <Zap className="w-4 h-4 fill-primary text-primary" />
                                            <p>{feature}</p>
                                        </div>
                                    ))}
                                </CardContent>
                                <CardFooter className="mt-auto">
                                    <Link
                                        href="#"
                                        className={cn(
                                            "w-full text-center text-primary-foreground bg-primary p-2 rounded-md text-sm font-medium",
                                            card.title !== "Unlimited Saas" && "!bg-foreground !text-background"
                                        )}
                                    >
                                        {card.buttonText}
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Wrapper>
           
        </section>
    )
};

export default HomePage;
