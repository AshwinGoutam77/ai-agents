export default function CallToAction() {
    return (
        <div
            className={`text-center mt-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "800ms" }}
        >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Team</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    We're always looking for talented individuals who share our passion for AI and innovation. Come help us
                    shape the future of work.
                </p>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    View Open Positions
                </button>
            </div>
        </div>
    )
}
