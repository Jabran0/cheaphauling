"use client";

import { MapPin, Mail, Phone, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/service", label: "Service" },
    { href: "/faq", label: "FAQ" },
    { href: "/privacypolicy", label: "Privacy Policy" },
    { href: "/smsterms", label: "SMS Terms & Privacy Policy" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="w-full ms:px-4 px-2 py-2 bg-primary">
        <div className="flex flex-col justify-center items-center lg:flex-row md:justify-between">
          {/* Marquee text */}
          <div className="flex items-center   pr-2 ">
            <div className="flex items-center gap-2 overflow-hidden text-white">
              <span className="whitespace-nowrap  sm:flex media_link">
                USDOT No: 4409615
              </span>
              <b>|</b>
              <span className="whitespace-nowrap  sm:flex text-white media_link">
                MC: MC-1732090
              </span>
            </div>
          </div>
          <div className="w-full lg:w-2/5 overflow-hidden hidden md:hidden lg:flex">
            <div className="inline-block animate-marquee text-white font-medium text-base whitespace-nowrap">
              Cheap Hauling provides safe, reliable, and affordable vehicle
              shipping across USA.
            </div>
          </div>

          {/* Contact info */}
          <div className="flex lg:gap-2 gap-1 text-white sm:text-base media_link">
            <div className="flex items-center gap-0 md:gap-2 overflow-hidden">
              <MapPin className="sm:w-5 sm:h-5 w-4 h-3" />
              <span className="whitespace-nowrap hidden ">
                54 STATE ST STE 804 ALBANY
              </span>
            </div>
            <b>|</b>
            <div className="flex items-center gap-0 md:gap-2 sm:text-base media_link">
              <a
                href="mailto:Admin@cheaphualing.net"
                className="flex items-center gap-0 md:gap-2 overflow-hidden"
              >
                <Mail className="sm:w-5 sm:h-5 w-4 h-3" />
                <span className="whitespace-nowrap">
                  Admin@cheaphualing.net
                </span>
              </a>
            </div>

            <b>|</b>
            <div className="flex items-center gap-2 sm:text-base media_link">
              <Link
                href="tel:+1 (205) 852-6534"
                className="flex items-center gap-0 md:gap-2 overflow-hidden"
              >
                <Phone className="sm:w-5 sm:h-5 w-4 h-3" />
                <span className="whitespace-nowrap">+1 (205) 852-6534</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="px-4 py-2 bg-white shadow sticky top-0 z-40">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="w-[100px] sm:w-[180px] md:w-[180px]">
              <Image
                src="/image/logo1.webp"
                alt="cheaphualing Logo"
                width={200}
                height={90}
                priority
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-5 items-center">
            <ul className="flex lg:gap-2 xl:gap-7 text-lg head_title text-secondary">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <Link href="/quote">
              <button className="bg-primary text-white py-2 px-3 lg:py-3 lg:px-4 rounded media_link hover:bg-light">
                Get A Quote
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-secondary"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-bold text-lg text-secondary">Menu</h2>
            <button onClick={() => setIsOpen(false)}>
              <X size={28} />
            </button>
          </div>

          <ul className="flex flex-col gap-5 p-5 text-secondary">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="p-5">
            <Link href="/quote" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-primary text-white py-3 rounded">
                Get A Quote
              </button>
            </Link>
          </div>
        </div>

        {/* Overlay  bg-black/40*/}
        {isOpen && (
          <div
            className="fixed inset-0  z-50"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </>
  );
}
