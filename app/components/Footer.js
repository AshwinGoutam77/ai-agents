export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Product: ["AI Agents", "Pricing", "Features", "Integrations"],
    Company: ["About Us", "Careers", "Blog", "Contact"],
    Resources: ["Documentation", "Help Center", "Community", "Status"],
  }

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">△</span>
              </div>
              <span className="text-2xl font-bold">AGENTS</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Empowering businesses with AI agents that work around the clock to boost productivity and efficiency.
            </p>
            <div className="flex space-x-4">
              {["twitter", "linkedin", "github", "discord"].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300 group"
                >
                  <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                    {social[0].toUpperCase()}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4 text-lg">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">© {currentYear} AI Agents. All rights reserved.</p>
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <span>Made with ❤️ for the future of work</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
