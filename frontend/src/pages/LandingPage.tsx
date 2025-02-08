import { useEffect } from "react";
const LandingPage = () => {
  const closeGalleryModal = () => {
    const modal = document.getElementById("galleryModal");
    if (modal) {
      modal.classList.add("hidden");
    }
  };

  useEffect(() => {
    const viewMoreBtn = document.getElementById("viewMoreGallery");
    const modal = document.getElementById("galleryModal");
    const galleryItems = document.querySelectorAll(".group");

    if (viewMoreBtn && modal) {
      viewMoreBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
      });

      galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
          modal.classList.remove("hidden");
        });
      });

      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeGalleryModal();
        }
      });

      // Cleanup event listeners when component unmounts
      return () => {
        viewMoreBtn.removeEventListener("click", () =>
          modal.classList.remove("hidden")
        );
        galleryItems.forEach((item) =>
          item.removeEventListener("click", () =>
            modal.classList.remove("hidden")
          )
        );
        modal.removeEventListener("click", (e) => {
          if (e.target === modal) {
            closeGalleryModal();
          }
        });
      };
    }
  }, []);
  return (

    <main id="main-content" className="flex-1 relative ">

        <div id="root">
          <section id="hero" className="bg-neutral-900 min-h-screen pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center min-h-[70vh]">
              <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 animate__animated animate__fadeInLeft">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                  National Institute of Technology
                  <span className="block text-blue-500">Srinagar</span>
                </h1>
                <p className="text-gray-300 text-lg mb-8">
                  Empowering minds, Engineering futures - An Institute of National Importance under Ministry of Education, Government of India
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <a href="#academics" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 animate__animated animate__pulse animate__infinite">
                    Explore Academics
                  </a>
                  <a href="#contact" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-neutral-900 transition duration-300">
                    Contact Us
                  </a>
                </div>
              </div>
              <div className="lg:w-1/2 animate__animated animate__fadeInRight">
                <div className="relative">
                  <div className="w-full h-96 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-2xl transform rotate-3 absolute"></div>
                  <div className="w-full h-96 bg-neutral-800 rounded-lg shadow-2xl relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-7xl text-white mb-4">50+</div>
                        <div className="text-xl text-gray-300">Years of Excellence</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-center gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">10000+</div>
                    <div className="text-gray-400">Alumni</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">200+</div>
                    <div className="text-gray-400">Faculty</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">3000+</div>
                    <div className="text-gray-400">Students</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative bottom-0 left-0 w-full overflow-hidden">
              <svg className="relative block w-full h-20" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-neutral-100"></path>
              </svg>
            </div>
          </section>
        </div>
        <div id="root">
          <section id="about" className="bg-neutral-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 animate__animated animate__fadeIn">
                <h2 className="text-4xl font-bold text-neutral-900 mb-4">About NIT Srinagar</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
              </div>
        
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="animate__animated animate__fadeInLeft">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Our Legacy</h3>
                    <p className="text-neutral-600 mb-6">
                      Established in 1960, NIT Srinagar has been at the forefront of technical education in India. Located in the beautiful valley of Kashmir, the institute has been nurturing technical talent and producing leaders in various fields of engineering and technology.
                    </p>
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-4">Our Mission</h3>
                    <p className="text-neutral-600 mb-6">
                      To develop highly qualified, ethical and socially responsible engineers, scientists and technologists who can contribute to nation-building and society's sustainable development.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-8">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="ml-3 text-neutral-700">NAAC Accredited</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <span className="ml-3 text-neutral-700">Institute of National Importance</span>
                      </div>
                    </div>
                  </div>
                </div>
        
                <div className="space-y-6 animate__animated animate__fadeInRight">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-semibold text-neutral-900 mb-3">Academic Excellence</h4>
                    <p className="text-neutral-600">Offering various undergraduate, postgraduate, and doctoral programs in engineering and technology.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-semibold text-neutral-900 mb-3">Research Focus</h4>
                    <p className="text-neutral-600">State-of-the-art research facilities and collaboration with leading institutions worldwide.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-semibold text-neutral-900 mb-3">Campus Life</h4>
                    <p className="text-neutral-600">Vibrant campus culture with modern amenities and diverse student activities.</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-semibold text-neutral-900 mb-3">Industry Connect</h4>
                    <p className="text-neutral-600">Strong industry partnerships ensuring excellent placement opportunities for students.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div id="root">
          <section id="academics" className="bg-neutral-900 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 animate__animated animate__fadeIn">
                <h2 className="text-4xl font-bold text-white mb-4">Academic Programs</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
              </div>
        
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-neutral-800 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 animate__animated animate__fadeInUp">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v7"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-white text-center mb-4">Undergraduate</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      B.Tech Civil Engineering
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      B.Tech Mechanical Engineering
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      B.Tech Electronics & Communication
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      B.Tech Computer Science
                    </li>
                  </ul>
                </div>
        
                <div className="bg-neutral-800 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 animate__animated animate__fadeInUp animate__delay-1s">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-white text-center mb-4">Postgraduate</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      M.Tech Structural Engineering
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      M.Tech Power Systems
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      M.Tech VLSI Design
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      MBA
                    </li>
                  </ul>
                </div>
                <div className="bg-neutral-800 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300 animate__animated animate__fadeInUp animate__delay-2s">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-white text-center mb-4">Doctoral</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Ph.D. in Engineering
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Ph.D. in Sciences
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      Ph.D. in Management
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div id="root">
          <section id="notableAlumni" className="bg-neutral-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 animate__animated animate__fadeIn">
                <h2 className="text-4xl font-bold text-neutral-900 mb-4">Notable Alumni</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
              </div>
        
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 animate__animated animate__fadeInUp">
                  <div className="p-6">
                    <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 text-center mb-2"> Sonam WangChuck</h3>
                    <p className="text-blue-600 text-center mb-3">Batch of 1983</p>
                    <p className="text-neutral-600 text-center mb-4">Founder, SECMOL</p>
                    <div className="text-sm text-neutral-500 text-center">
                    Engineer, Innovator and Education Reformist
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 animate__animated animate__fadeInUp animate__delay-1s">
                  <div className="p-6">
                    <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 text-center mb-2">Prof. Sarah Khan</h3>
                    <p className="text-blue-600 text-center mb-3">Batch of 1992</p>
                    <p className="text-neutral-600 text-center mb-4">Research Director, MIT</p>
                    <div className="text-sm text-neutral-500 text-center">
                      Leading Researcher in Quantum Computing
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 animate__animated animate__fadeInUp animate__delay-2s">
                  <div className="p-6">
                    <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-900 text-center mb-2">Er. Amit Sharma</h3>
                    <p className="text-blue-600 text-center mb-3">Batch of 1998</p>
                    <p className="text-neutral-600 text-center mb-4">Founder, Green Energy Solutions</p>
                    <div className="text-sm text-neutral-500 text-center">
                      Renewable Energy Innovation Leader
                    </div>
                  </div>
                </div>
              </div>
        
              <div className="text-center mt-12">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300 animate__animated animate__pulse animate__infinite">
                  View More Alumni
                </button>
              </div>
        
              <div className="mt-16 bg-neutral-800 rounded-xl p-8 animate__animated animate__fadeIn">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-semibold mb-4">Alumni Achievement Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="p-4">
                      <div className="text-4xl font-bold text-blue-500 mb-2">50+</div>
                      <div className="text-gray-300">CEOs & Founders</div>
                    </div>
                    <div className="p-4">
                      <div className="text-4xl font-bold text-blue-500 mb-2">200+</div>
                      <div className="text-gray-300">Research Patents</div>
                    </div>
                    <div className="p-4">
                      <div className="text-4xl font-bold text-blue-500 mb-2">1000+</div>
                      <div className="text-gray-300">Industry Leaders</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div id="root">
          <section id="gallery" className="bg-neutral-900 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 animate__animated animate__fadeIn">
                <h2 className="text-4xl font-bold text-white mb-4">Campus Gallery</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
              </div>
        
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group relative aspect-video overflow-hidden rounded-xl animate__animated animate__fadeInUp">
                  <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">Main Academic Block</p>
                  </div>
                </div>
        
                <div className="group relative aspect-video overflow-hidden rounded-xl animate__animated animate__fadeInUp">
                  <div className="w-full h-full bg-gradient-to-r from-green-500 to-blue-500"></div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">Central Library</p>
                  </div>
                </div>
        
                <div className="group relative aspect-video overflow-hidden rounded-xl animate__animated animate__fadeInUp">
                  <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">Research Center</p>
                  </div>
                </div>
        
                <div className="group relative aspect-video overflow-hidden rounded-xl animate__animated animate__fadeInUp">
                  <div className="w-full h-full bg-gradient-to-r from-yellow-500 to-red-500"></div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">Sports Complex</p>
                  </div>
                </div>
        
                <div className="group relative aspect-video overflow-hidden rounded-xl animate__animated animate__fadeInUp">
                  <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-blue-500"></div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">Hostel Buildings</p>
                  </div>
                </div>
        
                <div className="group relative aspect-video overflow-hidden rounded-xl animate__animated animate__fadeInUp">
                  <div className="w-full h-full bg-gradient-to-r from-red-500 to-orange-500"></div>
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-lg font-semibold">Auditorium</p>
                  </div>
                </div>
              </div>
        
              <div className="mt-12 text-center">
                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 animate__animated animate__pulse animate__infinite" id="viewMoreGallery">
                  View More Photos
                </button>
              </div>
            </div>
            <div id="galleryModal" className="fixed inset-0 bg-black bg-opacity-75 hidden z-50">
              <div className="flex items-center justify-center min-h-screen p-4">
                <div className="relative bg-neutral-800 rounded-xl max-w-4xl w-full">
                  <button className="absolute top-4 right-4 text-white hover:text-gray-300" onClick={() => closeGalleryModal()}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="p-8">
                    <div id="modalContent" className="aspect-video bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        
          {/* <script>
            document.addEventListener('DOMContentLoaded', function() {
              const viewMoreBtn = document.getElementById('viewMoreGallery');
              const modal = document.getElementById('galleryModal');
              const galleryItems = document.querySelectorAll('.group');
        
              viewMoreBtn.addEventListener('click', function() {
                modal.classNameList.remove('hidden');
              });
        
              galleryItems.forEach(item => {
                item.addEventListener('click', function() {
                  modal.classNameList.remove('hidden');
                });
              });
        
              window.closeGalleryModal = function() {
                modal.classNameList.add('hidden');
              };
        
              modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                  closeGalleryModal();
                }
              });
            });
          </script> */}
        </div>
        <div id="root">
          <section id="events" className="bg-neutral-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 animate__animated animate__fadeIn">
                <h2 className="text-4xl font-bold text-neutral-900 mb-4">Upcoming Events</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
              </div>
        
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 animate__animated animate__fadeInUp">
                  <div className="bg-blue-600 text-white p-4">
                    <div className="text-2xl font-bold">25</div>
                    <div className="text-sm">MAY 2024</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">Annual Tech Symposium</h3>
                    <div className="flex items-center text-neutral-600 mb-3">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      9:00 AM - 5:00 PM
                    </div>
                    <div className="flex items-center text-neutral-600 mb-4">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Main Auditorium
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                      Register Now
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 animate__animated animate__fadeInUp animate__delay-1s">
                  <div className="bg-blue-600 text-white p-4">
                    <div className="text-2xl font-bold">10</div>
                    <div className="text-sm">JUNE 2024</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">Research Conference</h3>
                    <div className="flex items-center text-neutral-600 mb-3">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      10:00 AM - 4:00 PM
                    </div>
                    <div className="flex items-center text-neutral-600 mb-4">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Conference Hall
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                      Submit Paper
                    </button>
                  </div>
                </div>
        
               
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 animate__animated animate__fadeInUp animate__delay-2s">
                  <div className="bg-blue-600 text-white p-4">
                    <div className="text-2xl font-bold">15</div>
                    <div className="text-sm">JULY 2024</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-neutral-900 mb-3">Alumni Meet</h3>
                    <div className="flex items-center text-neutral-600 mb-3">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      11:00 AM - 6:00 PM
                    </div>
                    <div className="flex items-center text-neutral-600 mb-4">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Campus Ground
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                      RSVP Now
                    </button>
                  </div>
                </div>
              </div>
        
              <div className="mt-12 bg-white rounded-xl p-8 shadow-lg animate__animated animate__fadeIn">
                <h3 className="text-2xl font-semibold text-neutral-900 mb-6 text-center">Event Calendar</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-neutral-100 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 bg-neutral-100 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Event</th>
                        <th className="px-6 py-3 bg-neutral-100 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Venue</th>
                        <th className="px-6 py-3 bg-neutral-100 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-neutral-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">25 May 2024</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Annual Tech Symposium</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Main Auditorium</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Open
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">10 June 2024</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Research Conference</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Conference Hall</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Coming Soon
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">15 July 2024</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Alumni Meet</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">Campus Ground</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Planning
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div id="root">
          <section id="donations" className="bg-neutral-900 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 animate__animated animate__fadeIn">
                <h2 className="text-4xl font-bold text-white mb-4">Support NIT Srinagar</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
                <p className="text-gray-300 max-w-2xl mx-auto">Your contribution helps us maintain excellence in education and research, supporting future generations of engineers and innovators.</p>
              </div>
        
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="bg-neutral-800 rounded-xl p-8 animate__animated animate__fadeInLeft">
                  <h3 className="text-2xl font-semibold text-white mb-6">Bank Account Details</h3>
                  <div className="space-y-6">
                    <div className="bg-neutral-700 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-white mb-4">Account Information</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Account Name:</span>
                          <span className="text-white font-medium">NIT Srinagar Development Fund</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Account Number:</span>
                          <span className="text-white font-medium">XXXXXXXXXX1234</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">IFSC Code:</span>
                          <span className="text-white font-medium">SBIN0007356</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Bank Name:</span>
                          <span className="text-white font-medium">State Bank of India</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Branch:</span>
                          <span className="text-white font-medium">NIT Srinagar Campus</span>
                        </div>
                      </div>
                    </div>
        
                    <div className="bg-neutral-700 p-6 rounded-lg">
                      <h4 className="text-lg font-medium text-white mb-4">UPI Details</h4>
                      <div className="text-center">
                        <div className="bg-white p-4 rounded-lg inline-block mb-4">
                          <div className="w-32 h-32 bg-neutral-200 rounded-lg flex items-center justify-center">
                            <span className="text-neutral-600 text-sm">QR Code</span>
                          </div>
                        </div>
                        <div className="text-gray-300">
                          UPI ID: nitsrinagar@sbi
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        
                <div className="space-y-6 animate__animated animate__fadeInRight">
                  <div className="bg-neutral-800 rounded-xl p-8">
                    <h3 className="text-2xl font-semibold text-white mb-6">Donation Categories</h3>
                    <div className="space-y-4">
                      <div className="bg-neutral-700 p-6 rounded-lg hover:bg-neutral-600 transition-all duration-300 cursor-pointer">
                        <h4 className="text-lg font-medium text-white mb-2">Infrastructure Development</h4>
                        <p className="text-gray-300 text-sm">Support campus infrastructure upgrades and new facilities</p>
                      </div>
                      <div className="bg-neutral-700 p-6 rounded-lg hover:bg-neutral-600 transition-all duration-300 cursor-pointer">
                        <h4 className="text-lg font-medium text-white mb-2">Research Fund</h4>
                        <p className="text-gray-300 text-sm">Enable cutting-edge research and innovation projects</p>
                      </div>
                      <div className="bg-neutral-700 p-6 rounded-lg hover:bg-neutral-600 transition-all duration-300 cursor-pointer">
                        <h4 className="text-lg font-medium text-white mb-2">Student Scholarships</h4>
                        <p className="text-gray-300 text-sm">Help deserving students achieve their dreams</p>
                      </div>
                      <div className="bg-neutral-700 p-6 rounded-lg hover:bg-neutral-600 transition-all duration-300 cursor-pointer">
                        <h4 className="text-lg font-medium text-white mb-2">Library Resources</h4>
                        <p className="text-gray-300 text-sm">Expand our digital and physical library collections</p>
                      </div>
                    </div>
                  </div>
        
                  <div className="bg-blue-600 rounded-xl p-8 text-center animate__animated animate__pulse animate__infinite">
                    <h3 className="text-2xl font-bold text-white mb-4">Need Assistance?</h3>
                    <p className="text-white mb-6">Contact our donation support team for any queries</p>
                    <div className="flex justify-center gap-4">
                      <button className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300">
                        Contact Support
                      </button>
                      <button className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                        Download Guide
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div id="root">
          <section id="contact" className="bg-neutral-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16 animate__animated animate__fadeIn">
                <h2 className="text-4xl font-bold text-neutral-900 mb-4">Contact Us</h2>
                <div className="w-20 h-1 bg-blue-600 mx-auto mb-6"></div>
                <p className="text-neutral-600 max-w-2xl mx-auto">Get in touch with us for any queries or information about NIT Srinagar</p>
              </div>
        
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
     
                <div className="animate__animated animate__fadeInLeft">
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <form id="contactForm" className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                        <input type="text" id="name" name="name" className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300" required />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
                        <input type="email" id="email" name="email" className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300" required />
                      </div>
        
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">Subject</label>
                        <select id="subject" name="subject" className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300">
                          <option value="">Select a subject</option>
                          <option value="admission">Admission Inquiry</option>
                          <option value="academics">Academic Information</option>
                          <option value="research">Research Collaboration</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
        
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">Message</label>
                        <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-300" required></textarea>
                      </div>
        
                      <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300">
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
        
        
                <div className="space-y-6 animate__animated animate__fadeInRight">
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-6">Contact Information</h3>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-medium text-neutral-900">Address</h4>
                          <p className="text-neutral-600">National Institute of Technology Srinagar, Hazratbal, Srinagar, J&K - 190006</p>
                        </div>
                      </div>
        
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-medium text-neutral-900">Email</h4>
                          <p className="text-neutral-600">info@nitsrinagar.ac.in</p>
                        </div>
                      </div>
        
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h4 className="text-lg font-medium text-neutral-900">Phone</h4>
                          <p className="text-neutral-600">+91-194-2424809</p>
                        </div>
                      </div>
                    </div>
                  </div>
        
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-2xl font-semibold text-neutral-900 mb-6">Working Hours</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Monday - Friday</span>
                        <span className="text-neutral-900 font-medium">9:00 AM - 5:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Saturday</span>
                        <span className="text-neutral-900 font-medium">9:00 AM - 1:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Sunday</span>
                        <span className="text-neutral-900 font-medium">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div id="root">
          {/* <footer id="footer" className="bg-neutral-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
                <div className="animate__animated animate__fadeInUp">
                  <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">About Us</a></li>
                    <li><a href="#academics" className="text-gray-300 hover:text-white transition-colors duration-300">Academics</a></li>
                    <li><a href="#notableAlumni" className="text-gray-300 hover:text-white transition-colors duration-300">Alumni</a></li>
                    <li><a href="#events" className="text-gray-300 hover:text-white transition-colors duration-300">Events</a></li>
                    <li><a href="#donations" className="text-gray-300 hover:text-white transition-colors duration-300">Donations</a></li>
                    <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300">Contact</a></li>
                  </ul>
                </div>
        
        
                <div className="animate__animated animate__fadeInUp animate__delay-1s">
                  <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <span className="text-gray-300">Hazratbal, Srinagar, J&K - 190006</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                      <span className="text-gray-300">info@nitsrinagar.ac.in</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      <span className="text-gray-300">+91-194-2424809</span>
                    </li>
                  </ul>
                </div>
        
               
                <div className="animate__animated animate__fadeInUp animate__delay-2s">
                  <h3 className="text-xl font-semibold mb-4">Important Links</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">NIRF Rankings</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">RTI</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Careers</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Tenders</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Student Portal</a></li>
                  </ul>
                </div>
        
               
                <div className="animate__animated animate__fadeInUp animate__delay-3s">
                  <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
        
              <div className="border-t border-neutral-800 mt-12 pt-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-400 text-sm">© 2024 National Institute of Technology Srinagar. All rights reserved.</p>
                  <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
                    <a href="#" className="text-gray-400 hover:text-white text-sm">Sitemap</a>
                  </div>
                </div>
              </div>
            </div>
          </footer> */}
        </div>
      </main>

    // <div classNameName="w-full h-screen overflow-hidden">
    //   <iframe
    //     src="/landing.html"
    //     title="Landing Page"
    //     classNameName="w-full h-full border-none"
        
    //   />
    // </div>
    
  

  );
};


export default LandingPage