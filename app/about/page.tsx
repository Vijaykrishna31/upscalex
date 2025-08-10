import { Card } from "@/components/ui/card"
import { Target, Eye, Users, Lightbulb, TrendingUp, Award } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">About UpscaleX</h1>
            <p className="text-xl text-gray-600 mb-8">
              We're on a mission to democratize entrepreneurship by connecting startups with the right mentors,
              resources, and opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="p-8 border-l-4 border-l-blue-600">
              <div className="flex items-center mb-4">
                <Eye className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-gray-600 text-lg">
                To become India's leading platform that empowers every entrepreneur with the tools, mentorship, and
                community needed to transform innovative ideas into successful businesses.
              </p>
            </Card>
            <Card className="p-8 border-l-4 border-l-purple-600">
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-gray-600 text-lg">
                To bridge the gap between aspiring entrepreneurs and experienced mentors, providing comprehensive
                support from ideation to scaling through our integrated platform.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Story</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">The Problem We Saw</h3>
                  <p className="text-gray-600">
                    Many talented entrepreneurs struggle to find the right mentorship, resources, and connections needed
                    to scale their startups. Traditional networking was limited and inefficient.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Our Solution</h3>
                  <p className="text-gray-600">
                    We created UpscaleX to democratize access to mentorship, legal services, funding opportunities, and
                    a thriving community of like-minded entrepreneurs and industry experts.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Our Impact</h3>
                  <p className="text-gray-600">
                    Today, we've helped over 500 startups connect with mentors, secure funding, and access essential
                    services. Our community continues to grow and thrive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Serve</h2>
            <p className="text-lg text-gray-600">
              Our platform caters to diverse groups in the entrepreneurial ecosystem
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Startups</h3>
              <p className="text-gray-600">Early-stage companies seeking mentorship, funding, and growth strategies</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Students</h3>
              <p className="text-gray-600">
                Aspiring entrepreneurs looking for internships, bootcamps, and career guidance
              </p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Award className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mentors</h3>
              <p className="text-gray-600">Industry experts sharing knowledge and guiding the next generation</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Freelancers</h3>
              <p className="text-gray-600">Independent professionals offering specialized services to startups</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Future Goals</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="text-4xl font-bold">10K+</div>
                <h3 className="text-xl font-semibold">Startups by 2025</h3>
                <p className="text-blue-100">Expand our reach to support 10,000+ startups across India</p>
              </div>
              <div className="space-y-4">
                <div className="text-4xl font-bold">500+</div>
                <h3 className="text-xl font-semibold">Expert Mentors</h3>
                <p className="text-blue-100">Build a network of 500+ industry experts and successful entrepreneurs</p>
              </div>
              <div className="space-y-4">
                <div className="text-4xl font-bold">₹100M+</div>
                <h3 className="text-xl font-semibold">Funding Facilitated</h3>
                <p className="text-blue-100">Help startups raise over ₹100M in funding through our platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
