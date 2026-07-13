export default function Contact() {
  return (
    <section id="contact" className="bg-black text-white px-6 py-24 border-t border-gray-800">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
          Contact
        </p>
        <h2 className="text-3xl font-bold mb-6">
          Let's build something.
        </h2>
        <p className="text-gray-400 mb-8">
          Based in Port Harcourt, working across strategy, product, and engineering.
        </p>
        <a
          href="mailto:alphanarrative1@gmail.com"
          className="inline-block bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition"
        >
          Get in touch
        </a>
      </div>
      <footer className="text-center text-gray-600 text-sm mt-24">
        © {new Date().getFullYear()} Alpha Narrative. All rights reserved.
      </footer>
    </section>
  );
}