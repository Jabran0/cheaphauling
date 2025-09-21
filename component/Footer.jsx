"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative text-white  ">
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgb(23 29 46), rgb(21 27 41 / 51%)), url(/image/footer1.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Top Section */}
        <div className="w-full px-2 sm:px-4 py-12 max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo / About */}
          <div className=" flex justify-center flex-col w-full items-center sm:items-start sm:justify-start  pl-4">
            {/* Logo */}
            <div className="w-[180px] sm:w-[180px] md:w-[180px] mb-4">
              <Image
                src="/image/logo1.webp"
                alt="cheaphualing Logo"
                width={200}
                height={80}
                priority
              />
            </div>

            {/* <h2 className="text-2xl font-bold mb-3">Cheap Hauling</h2> */}
            <p className="text-sm leading-relaxed text-gray-100">
              Safe, reliable, and affordable car shipping across the USA —
              on-time delivery with 24/7 customer support you can trust.
            </p>
          </div>

          {/* Quick Links */}
          <div className="pl-4">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/service">Service</Link>
              </li>
              <li>
                <Link href="/faq">Faq</Link>
              </li>
              <li>
                <Link href="/privacypolicy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/smsterms">SMS Terms & Privacy Policy</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className=" pl-4">
            <h3 className="text-lg font-semibold mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/service">Our Services</Link>
              </li>
              <li>
                <Link href="/about">What We Do</Link>
              </li>
              <li>
                <Link href="/">Request a Freight</Link>
              </li>
              <li>
                <Link href="/brokerage-terms">Brokerage Terms</Link>
              </li>
            </ul>
          </div>
          {/* Contact Info */}

          <div className="pl-4 ">
            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-start items-center gap-2">
                <MapPin size={18} /> 54 STATE ST STE 804 ALBANY, NY   12207
              </li>
              <li className="flex justify-start items-center gap-2">
                <Link
                href="tel:+1 (205) 852-6534"
                className="flex items-center gap-0 md:gap-2 overflow-hidden"
              >
                <Phone className="sm:w-5 sm:h-5 w-4 h-3" />
                <span className="whitespace-nowrap">+1 (205) 852-6534</span>
              </Link>
              </li>
              <li className="flex justify-start items-center gap-2">
                <Link
                  href="mailto:Admin@cheaphualing.net"
                  className="flex items-center gap-0 md:gap-2 overflow-hidden"
                >
                  <Mail className="sm:w-5 sm:h-5 w-4 h-3" />
                  <span className="whitespace-nowrap">Admin@cheaphualing.net</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* stemp img */}

          <div className="relative w-full max-w-[280px] aspect-[5/3] mb-4">
            <Image
              src="/image/stemp1.webp"
              alt="Stamp Logo"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 250px"
              priority
            />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className=" text-center bg-[#e15403]  py-3 text-sm relative">
        © {new Date().getFullYear()} Cheaphualing. All rights reserved.
      </div>
    </footer>
  );
}
