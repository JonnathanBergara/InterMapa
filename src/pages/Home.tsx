import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Send, MapPin, Mail, Phone, Menu, X, Linkedin, Instagram, Facebook, 
  ChevronRight, Target, Eye, CheckCircle, Award, Building2 
} from 'lucide-react';

// Funciones de utilidad
const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone: string): boolean => {
  return /^[0-9]+$/.test(phone) && phone.length >= 8;
};

const sanitizeFormData = (data: any): any => {
  const sanitized: any = {};
  for (const key in data) {
    sanitized[key] = typeof data[key] === 'string' 
      ? data[key].trim().replace(/<[^>]*>?/gm, '') 
      : data[key];
  }
  return sanitized;
};

// Tipos para TypeScript
type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  country: string;
  message: string;
};

// Componente de la sección de contacto
const LatinAmericaPresenceSection = ({ 
  formData, 
  formErrors, 
  handleChange, 
  handleSubmit 
}: {
  formData: FormData;
  formErrors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}) => (
  <section id="contact" className="py-20 bg-gray-50">
    <div className="container mx-auto px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Presencia en Latinoamérica
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Grupo Intelector tiene presencia en Guatemala, El Salvador, Honduras, Nicaragua, 
            Costa Rica, Panamá, Colombia y Ecuador. Déjanos tus datos y nuestro equipo de ingenieros 
            te contactará para enviarte más información.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[600px] w-full flex items-center justify-center rounded-xl overflow-hidden shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=-95.00000000000001%2C-5.000000000000003%2C-70.00000000000001%2C20.000000000000004&amp;layer=mapnik"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-xl"
              ></iframe>
            </div>
            
            <div className="absolute bottom-4 left-0 right-0">
              <div className="flex flex-wrap justify-center gap-2 px-4">
                {[
                  'Guatemala', 
                  'El Salvador', 
                  'Honduras', 
                  'Nicaragua', 
                  'Costa Rica', 
                  'Panamá', 
                  'Colombia', 
                  'Ecuador'
                ].map((country) => (
                  <span 
                    key={country} 
                    className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md whitespace-nowrap"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg h-full flex flex-col justify-center">
            <div className="bg-green-50 p-4 rounded-lg mb-8">
              <p className="text-green-800 text-sm">
                Llena el formulario y nuestro equipo de ingenieros certificados te dará mayor información
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { field: 'name', label: 'Nombre completo', type: 'text' },
                { field: 'email', label: 'Correo electrónico (Corporativo)', type: 'email' },
                { field: 'phone', label: 'Número de celular', type: 'text' },
                { field: 'company', label: 'Empresa', type: 'text' },
                { field: 'position', label: 'Puesto', type: 'text' },
                { field: 'country', label: 'País', type: 'text' }
              ].map(({ field, label, type }) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <input
                    type={type}
                    id={field}
                    name={field}
                    value={formData[field as keyof FormData]}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${
                      formErrors[field] ? 'border-red-500' : ''
                    }`}
                    required
                  />
                  {formErrors[field] && (
                    <p className="mt-1 text-sm text-red-600">{formErrors[field]}</p>
                  )}
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors flex items-center justify-center"
              >
                <span>GUARDAR</span>
                <Send className="ml-2 h-5 w-5" />
              </button>
            </form>

            <div className="mt-8 space-y-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-green-700" />
                <span>Ecuador</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2 text-green-700" />
                <span>administracion.ec@intelector.net</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-2 text-green-700" />
                <span>+593 99 202 3186</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

function Home() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    country: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Verificar si hay una señal para hacer scroll al contacto
    const shouldScroll = sessionStorage.getItem('scrollToContact');
    if (shouldScroll === 'true') {
      const timer = setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        // Limpiar la señal después de hacer scroll
        sessionStorage.removeItem('scrollToContact');
      }, 100); // Pequeño delay para asegurar que el DOM esté listo
      
      return () => clearTimeout(timer);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es requerido';
    }
    
    if (!validateEmail(formData.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!validatePhone(formData.phone)) {
      errors.phone = 'Teléfono inválido';
    }
    
    if (!formData.company.trim()) {
      errors.company = 'La empresa es requerida';
    }
    
    if (!formData.position.trim()) {
      errors.position = 'El puesto es requerido';
    }
    
    if (!formData.country.trim()) {
      errors.country = 'El país es requerido';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const sanitizedData = sanitizeFormData(formData);
    
    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Mensaje enviado correctamente');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          position: '',
          country: '',
          message: ''
        });
      } else {
        alert(data.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error al enviar el mensaje. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`bg-white shadow-sm fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2 shadow-md' : 'py-4'}`}>
        <nav className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 md:space-x-4">
              <img 
                src="/Imagenes/LogoIntelector.png" 
                alt="Intelector Ecuador" 
                className="h-10 md:h-12"
              />
              <span className="text-lg md:text-xl font-semibold text-gray-800">Intelector Ecuador</span>
            </Link>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-green-800 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6 lg:space-x-8">
              <Link to="/" className="text-gray-600 hover:text-green-800 transition-colors">Inicio</Link>
              <Link to="/soluciones" className="text-gray-600 hover:text-green-800 transition-colors">Soluciones</Link>
              <Link to="/services-brands" className="text-gray-600 hover:text-green-800 transition-colors">Servicios y Marcas</Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <a href="#contact" className="bg-green-800 text-white px-4 py-2 md:px-6 md:py-2 rounded-full hover:bg-green-900 transition duration-300 text-sm md:text-base">
                Contáctanos
              </a>
              <div className="flex space-x-3">
                <a 
                  href="https://www.linkedin.com/company/grupointelector/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/grupointelector/?hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.facebook.com/p/Grupo-Intelector-61567309621283/?locale=tl_PH" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-800 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-green-800 transition-colors px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link 
                  to="/soluciones" 
                  className="text-gray-600 hover:text-green-800 transition-colors px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Soluciones
                </Link>
                <Link 
                  to="/services-brands" 
                  className="text-gray-600 hover:text-green-800 transition-colors px-2 py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Servicios y Marcas
                </Link>
                <a 
                  href="#contact" 
                  className="bg-green-800 text-white px-4 py-2 rounded-full hover:bg-green-900 transition duration-300 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contáctanos
                </a>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <a 
                  href="https://www.linkedin.com/company/grupointelector/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.instagram.com/grupointelector/?hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-600 transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.facebook.com/p/Grupo-Intelector-61567309621283/?locale=tl_PH" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-800 transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section with Security Background */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 relative overflow-hidden">
        {/* Background image with green overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Cybersecurity background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-green-900 opacity-80"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                Protegiendo y Optimizando tu Infraestructura Digital
              </h1>
              <p className="text-lg md:text-xl text-green-100 mb-6 md:mb-8">
                Somos la mejor alternativa como empresa especializada
                en el área de infraestructura y seguridad informática
              </p>
              <div className="flex space-x-3 sm:space-x-4">
                <Link 
                  to="/soluciones" 
                  className="bg-white text-green-800 px-6 py-2 md:px-8 md:py-3 rounded-full hover:bg-green-100 transition duration-300 flex items-center font-semibold text-sm md:text-base"
                >
                  Empezar ahora <ChevronRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="relative">
                <img 
                  src="Imagenes/inte.png" 
                  alt="Cybersecurity" 
                  className="rounded-lg shadow-xl border-0 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12">
              Sobre Nosotros
            </h2>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="md:w-1/2 order-2 md:order-1">
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-justify">
                  Intelector Ecuador es una empresa líder en soluciones de seguridad y tecnología, 
                  con presencia en toda América Latina. Nos especializamos en proporcionar servicios 
                  integrales de ciberseguridad, consultoría IT y soluciones empresariales adaptadas 
                  a las necesidades específicas de cada cliente.
                </p>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <img 
                  src="Imagenes/IntelectorEC.jpeg"
                  alt="Cybersecurity Operations"
                  className="w-full rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Misión */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-green-800">
              <div className="flex items-center mb-4 md:mb-6">
                <Target className="h-8 w-8 md:h-12 md:w-12 text-green-800" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 ml-3 md:ml-4">Misión</h2>
              </div>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-justify">
                En Intelector Ecuador, somos especialistas en ciberseguridad, ofreciendo soluciones integrales para proteger tu infraestructura TI. Desde monitoreo proactivo (SOC/NOC) hasta consultoría especializada y Ethical Hacking, ayudamos a empresas a prevenir, detectar y responder a ciberamenazas con estrategias robustas y personalizadas.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border-t-4 border-green-800">
              <div className="flex items-center mb-4 md:mb-6">
                <Eye className="h-8 w-8 md:h-12 md:w-12 text-green-800" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 ml-3 md:ml-4">Visión</h2>
              </div>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-justify">
                Ser el socio estratégico líder en seguridad informática en Ecuador y Latinoamérica. Brindamos innovación y excelencia para proteger la información, ayudando a las empresas a fortalecer su seguridad digital y optimizar su infraestructura con soluciones seguras y eficientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/2">
              <div className="relative">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <img 
                    src="Imagenes/NOC2.webp" 
                    alt="Team collaboration" 
                    className="rounded-lg shadow-lg"
                  />
                  <img 
                    src="Imagenes/intelector1.jpeg" 
                    alt="Technology solutions" 
                    className="rounded-lg shadow-lg mt-6 sm:mt-8"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 bg-white p-4 sm:p-6 rounded-lg shadow-xl">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-800" />
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-green-800">30+</p>
                      <p className="text-xs sm:text-sm text-gray-600">Empresas que confían en nosotros</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                Contamos con más de 30 años de experiencia combinada en Ciberseguridad
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
                Otra muestra del respaldo que tendrás al trabajar con nosotros
              </p>
              
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-start">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-green-800 mr-3 md:mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold">Marcas líderes en tecnología</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Trabajamos con las mejores soluciones del mercado para proteger tu empresa</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-green-800 mr-3 md:mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold">Ingenieros Certificados</h3>
                    <p className="text-gray-600 text-sm sm:text-base">Todo nuestro equipo está altamente capacitado y certificados</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm sm:text-lg text-blue-900 italic">
                    "En un mundo digital en constante evolución, la seguridad no es una opción, es una necesidad. Nuestro compromiso es proteger lo que más importa: la información y la confianza de nuestros clientes."
                  </p>
                  <div className="mt-3 sm:mt-4 flex items-center">
                    <img 
                      src="Imagenes/DonMario.png" 
                      alt="CEO" 
                      className="h-8 w-8 sm:h-12 sm:w-12 rounded-full"
                    />
                    <div className="ml-3 sm:ml-4">
                      <p className="font-semibold text-sm sm:text-base">Mario Arriaza</p>
                      <p className="text-xs sm:text-sm text-gray-600">CEO</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Contacto */}
      <LatinAmericaPresenceSection 
        formData={formData}
        formErrors={formErrors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {/* Footer with Social Media */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4 md:mb-6">
                <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                  <img 
                    src="/Imagenes/inte1.png" 
                    alt="Intelector Ecuador" 
                    className="h-6 md:h-8"
                  />
                </Link>
              </div>
              <p className="text-gray-400 text-sm md:text-base">
                La ciberseguridad no es solo tecnología, es confianza. Protegemos tu negocio para que crezca sin límites
              </p>
              <div className="flex space-x-3 md:space-x-4 mt-3 md:mt-4">
                <a 
                  href="https://www.linkedin.com/company/grupointelector/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
                </a>
                <a 
                  href="https://www.instagram.com/grupointelector/?hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-400 transition-colors"
                >
                  <Instagram className="h-5 w-5 md:h-6 md:w-6" />
                </a>
                <a 
                  href="https://www.facebook.com/p/Grupo-Intelector-61567309621283/?locale=tl_PH" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Facebook className="h-5 w-5 md:h-6 md:w-6" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Soluciones</h4>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                <li><Link to="/soluciones" className="hover:text-green-400">Consultoria</Link></li>
                <li><Link to="/soluciones" className="hover:text-green-400">Centro de Operaciones de Seguridad (SOC)</Link></li>
                <li><Link to="/soluciones" className="hover:text-green-400">Centro de Operaciones de Red (NOC)</Link></li>
                <li><Link to="/soluciones" className="hover:text-green-400">Ethical Hacking</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Contacto</h4>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-sm md:text-base">
                <li>
                  <a href="mailto:administracion.ec@intelector.net" className="hover:text-green-400">
                    administracion.ec@intelector.net
                  </a>
                </li>
                <li>
                  <a 
                    href="https://wa.me/593992023186" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-green-400"
                  >
                    +593 99 202 3186
                  </a>
                </li>
                <li>Quito, Ecuador</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400 text-sm md:text-base">
            <p>&copy; 2024 Intelector Ecuador. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;