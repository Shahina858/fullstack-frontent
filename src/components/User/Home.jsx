import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiChevronLeft, FiChevronRight, FiTruck, FiCreditCard, FiAward, FiLock } from 'react-icons/fi';

// --- Sub-Components for clean code ---

const BookCard = ({ book }) => (
  <div className="flex-shrink-0 w-48 text-center">
    <motion.img
      src={book.img}
      alt={book.title}
      className="w-full h-64 object-cover rounded-md shadow-lg"
      whileHover={{ y: -8, scale: 1.05 }}
    />
    <h3 className="mt-4 font-bold text-gray-800">{book.title}</h3>
    <p className="text-sm text-gray-500">{book.author}</p>
    <p className="font-semibold text-indigo-600">{book.price}</p>
  </div>
);

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2025-12-31T23:59:59") - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = Object.keys(timeLeft).map(interval => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) { return null; }
        return (
            <div key={interval} className="text-center">
                <div className="text-4xl font-bold text-indigo-600">{timeLeft[interval]}</div>
                <div className="text-sm uppercase text-gray-500">{interval}</div>
            </div>
        );
    });
    return (
        <div className="flex justify-center space-x-8">
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
    );
};

const AnimatedStat = ({ number, label }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    useEffect(() => {
        if (inView) {
            controls.start({
                opacity: 1,
                transition: {
                    // This custom transition will animate the number
                    type: "tween",
                    duration: 2,
                    ease: "easeOut",
                    // Use a custom property for the animation
                    // and update the component's text content
                    onUpdate: (latest) => {
                        const el = document.querySelector(`[data-stat-label="${label}"]`);
                        if(el) {
                             el.textContent = Math.round(latest).toLocaleString();
                        }
                    }
                }
            });
        }
    }, [controls, inView, number, label]);

    // Animate from 0 to the target number using a motion value
    const animatedNumber = motion(number, { from: 0 });

    return (
        <div ref={ref} className="text-center">
            <motion.h3 
                className="text-5xl font-bold text-white" 
                data-stat-label={label}
                // Initial state driven by the custom property
                initial={{ opacity: 0 }}
                animate={controls}
                custom={number}
            >
                {/* Initial displayed number */}
                0
            </motion.h3>
            <p className="text-indigo-200 mt-2">{label}</p>
        </div>
    );
};


// --- MOCK DATA ---
const bestsellers = [
    { title: "The Martian", author: "Andy Weir", price: "$15.99", img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80" },
    { title: "Project Hail Mary", author: "Andy Weir", price: "$18.99", img: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?auto=format&fit=crop&w=400&q=80" },
    { title: "Klara and the Sun", author: "Kazuo Ishiguro", price: "$14.50", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80" },
    { title: "Dune", author: "Frank Herbert", price: "$17.00", img: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=400&q=80" },
    { title: "Atomic Habits", author: "James Clear", price: "$12.99", img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80" },
];

const newsArticles = [
    { title: "The Importance of Reading for Mental Health", date: "Oct 28, 2025", img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80" },
    { title: "10 Unexpected Reasons to Read a Classic Book", date: "Oct 25, 2025", img: "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?auto=format&fit=crop&w=600&q=80" },
    { title: "Why Reading is Important for Our Children", date: "Oct 22, 2025", img: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80" },
];


// --- MAIN HOMEPAGE COMPONENT ---
export default function HomePage() {
  return (
    <div className="bg-gray-50 font-sans">
      {/* 1. Hero Section */}
      <section className="relative bg-cover bg-center h-[70vh]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1800&q=80')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-4">
          <h2 className="text-sm font-bold uppercase tracking-widest">Back to School</h2>
          <h1 className="text-4xl md:text-6xl font-bold my-4">Special 50% Off</h1>
          <p className="max-w-xl mb-8">for our student community. Don't miss this opportunity to get your books at the best price.</p>
          <button className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-colors">
            Get The Deal
          </button>
        </div>
      </section>

      {/* 2. Value Propositions Section */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center"><FiTruck className="text-indigo-600 mb-2" size={32} /><h3 className="font-semibold">Quick Delivery</h3></div>
            <div className="flex flex-col items-center"><FiCreditCard className="text-indigo-600 mb-2" size={32} /><h3 className="font-semibold">Pay with Easy</h3></div>
            <div className="flex flex-col items-center"><FiAward className="text-indigo-600 mb-2" size={32} /><h3 className="font-semibold">Best Deal</h3></div>
            <div className="flex flex-col items-center"><FiLock className="text-indigo-600 mb-2" size={32} /><h3 className="font-semibold">Secured Payment</h3></div>
        </div>
      </section>

      {/* 3. Bestsellers Carousel Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Current Bestsellers</h2>
            <div className="flex space-x-2">
              <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"><FiChevronLeft /></button>
              <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"><FiChevronRight /></button>
            </div>
          </div>
          <div className="flex space-x-8 overflow-x-auto pb-4">
            {bestsellers.map((book) => <BookCard key={book.title} book={book} />)}
          </div>
        </div>
      </section>
      
      {/* 4. Modern Category Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative col-span-1 md:col-span-2 row-span-2 bg-red-400 p-8 rounded-lg text-white">
                    <h3 className="text-3xl font-bold">New Releases</h3>
                    <p>Check out the latest books from your favorite authors.</p>
                    <button className="mt-4 bg-white text-red-400 font-bold py-2 px-4 rounded">Shop Now</button>
                </div>
                <div className="bg-cyan-400 p-8 rounded-lg text-white">
                    <h3 className="text-2xl font-bold">Pre-Orders</h3>
                    <p>Be the first to read.</p>
                </div>
                <div className="bg-yellow-400 p-8 rounded-lg text-white">
                    <h3 className="text-2xl font-bold">Top Rated</h3>
                    <p>Discover our most popular books.</p>
                </div>
          </div>
      </section>

      {/* 5. Limited Time Offer Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-2">Limited Time Offer</h2>
            <p className="text-gray-600 mb-8">Don't miss out on these exclusive deals!</p>
            <CountdownTimer />
        </div>
      </section>
      
      {/* 6. Latest News Section */}
      <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {newsArticles.map(article => (
                    <div key={article.title} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img src={article.img} alt={article.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                            <h3 className="font-bold text-lg">{article.title}</h3>
                            <a href="#" className="text-indigo-600 font-semibold mt-4 inline-block">Read More →</a>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      </section>

      {/* 7. Animated Stats Section */}
      <section className="bg-indigo-700 py-16">
          <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-12">Explore Our New Library</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <AnimatedStat number={136098} label="Happy Customers" />
                    <AnimatedStat number={30000} label="Books" />
                    <AnimatedStat number={1269} label="Stores Around the World" />
                </div>
          </div>
      </section>
      
      {/* 8. Newsletter Signup */}
      <section className="py-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-2">Get Special Offer In Your Inbox</h2>
              <p className="text-gray-600 mb-8">Subscribe to our newsletter for the latest updates and offers.</p>
              <div className="flex">
                  <input type="email" placeholder="Enter your email address" className="w-full px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
                  <button className="bg-indigo-600 text-white font-bold px-6 rounded-r-md hover:bg-indigo-700">Subscribe</button>
              </div>
          </div>
      </section>

    </div>
  );
}
