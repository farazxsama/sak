'use client';

import { motion } from 'framer-motion';

// Replace these with real client logos later — drop files in /public/images/clients/
// and swap the `logo` path. Keeping name + logo together so it stays a single source of truth.
const rowOne = [
    { name: 'Client One', logo: '/images/clients/client-1.png' },
    { name: 'Client Two', logo: '/images/clients/client-2.png' },
    { name: 'Client Three', logo: '/images/clients/client-3.png' },
    { name: 'Client Four', logo: '/images/clients/client-4.png' },
    { name: 'Client Five', logo: '/images/clients/client-5.png' },
];

const rowTwo = [
    { name: 'Client Six', logo: '/images/clients/client-6.png' },
    { name: 'Client Seven', logo: '/images/clients/client-7.png' },
    { name: 'Client Eight', logo: '/images/clients/client-8.png' },
    { name: 'Client Nine', logo: '/images/clients/client-9.png' },
    { name: 'Client Ten', logo: '/images/clients/client-10.png' },
];

function LogoItem({ name }) {
    // Placeholder chip standing in for a real logo image.
    // Swap this whole block for: <img src={logo} alt={name} className="h-8 w-auto object-contain opacity-70" />
    return (
        <div className="flex h-12 shrink-0 items-center px-10">
            <span className="whitespace-nowrap text-lg font-semibold tracking-tight text-[#6B7780]">
                {name}
            </span>
        </div>
    );
}

function MarqueeRow({ items, direction = 'left', duration = 28 }) {
    const doubled = [...items, ...items];

    return (
        <div className="relative w-full overflow-hidden">
            <motion.div
                className="flex w-max"
                animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
                transition={{ duration, repeat: Infinity, ease: 'linear' }}
            >
                {doubled.map((item, i) => (
                    <LogoItem key={`${item.name}-${i}`} name={item.name} />
                ))}
            </motion.div>

            {/* Edge fade so logos don't hard-cut at the container edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
        </div>
    );
}

export default function TrustedBy() {
    return (
        <section className="w-full bg-white py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-10 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-12 text-center sm:mb-16"
                >
                    <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight text-[#11161A] sm:text-4xl">
                        Trusted by high-performing brands in hospitality and F&amp;B
                    </h2>
                </motion.div>
                 <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="flex flex-col gap-6"
            >
                <MarqueeRow items={rowOne} direction="left" duration={30} />
                <MarqueeRow items={rowTwo} direction="right" duration={34} />
            </motion.div>
            </div>

           
        </section>
    );
}