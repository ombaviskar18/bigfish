"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components";
import Link from "next/link";
import Image from "next/image";
import Ic from "../../../../public/icons/icon.gif";

declare global {
    interface Window {
        ethereum?: any;
    }
}

const Navbar = () => {
    const [walletAddress, setWalletAddress] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const connectWallet = async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setWalletAddress(accounts[0]);
            } catch (error) {
                console.error("Error connecting wallet:", error);
            }
        } else {
            alert("MetaMask is not installed. Please install it to use this feature.");
        }
    };

    return (
        <header className="px-4 py-2 sticky top-0 inset-x-0 w-full bg-background/40 backdrop-blur-lg border-b border-border z-50">
            <Container>
                <div className="flex items-center justify-between h-full mx-auto md:max-w-screen-xl">
                    
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <Image src={Ic} alt="CryptoConnect Logo" width={30} height={30} />
                            <span className="text-lg font-medium">BigFish</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="hover:text-foreground/80 text-sm">
                            Home
                        </Link>
                        <Link href="#how" className="hover:text-foreground/80 text-sm">
                            About
                        </Link>
                        <Link href="#features" className="hover:text-foreground/80 text-sm">
                            Features
                        </Link>
                        <Link href="#pricing" className="hover:text-foreground/80 text-sm">
                            Pricing
                        </Link>
                    </nav>

                    {/* Wallet Button */}
                    <div className="hidden md:flex items-center">
                        <button
                            onClick={connectWallet}
                            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition text-sm flex items-center"
                        >
                            {walletAddress ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4) : "Connect Wallet"}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-background/80 backdrop-blur-md border border-border p-4 rounded-lg mt-2">
                        <div className="flex flex-col space-y-4">
                            <Link href="#how" className="hover:text-foreground/80 text-sm">
                                About
                            </Link>
                            <Link href="#features" className="hover:text-foreground/80 text-sm">
                                Features
                            </Link>
                            <Link href="#pricing" className="hover:text-foreground/80 text-sm">
                                Pricing
                            </Link>
                            <Link href="#blog" className="hover:text-foreground/80 text-sm">
                                Blog
                            </Link>
                            <button
                                onClick={connectWallet}
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition text-sm"
                            >
                                {walletAddress ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4) : "Connect Wallet"}
                            </button>
                        </div>
                    </div>
                )}
            </Container>
        </header>
    );
};

export default Navbar;
