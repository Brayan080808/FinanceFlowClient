import { Mail, Linkedin, GitlabIcon as GitHub, Phone, Send, MapPin } from 'lucide-react'
import useUser from '../../store/useUser'
import { useForm } from 'react-hook-form';
import useSendMail from '../../hooks/useSendMail';
import Spiner from '../Spiner'
import SuccessNotification from './SuccessNotification'
import ErrorNotification from './ErrorNotification'


export default function ContactSection() {

  const { theme } = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { mutate, isPending, isSuccess, isError, reset } = useSendMail();

  const onSubmit = (data) => {
    // Here you would typically handle the form submission
    mutate(data)
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : " bg-gradient-to-br from-[#40CFA4]/5 via-[#FFD080]/5 to-[#FF6B8B]/5 "} `}>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center px-4 py-5 sm:p-6 rounded-lg">
          <h2 className={`text-3xl font-extrabold ${theme === "dark" ? "text-white" : " text-gray-900"} sm:text-4xl`}>
            Contact Us
          </h2>
          <p className={`mt-4 text-lg  ${theme === "dark" ? "text-gray-300" : "text-gray-500"} `}>
            We'd love to hear from you! Get in touch with us through any of these channels.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className={`${theme==="dark" ? "bg-gray-800" : "bg-white" } overflow-hidden shadow rounded-lg`}>
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-[#40CFA4] rounded-md p-3">
                  <Mail className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h3 className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-900 "}`}>Email</h3>
                  <p className={`mt-1 text-sm ${theme==="dark" ? "text-gray-300" : "text-gray-500"} `}>
                    <a href="bryanayalaacosta@gmail.com" className="hover:text-[#40CFA4]">
                      bryanayalaacosta@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={`${theme==="dark" ? "bg-gray-800" : "bg-white"} overflow-hidden shadow rounded-lg`}>
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-[#FFD080] rounded-md p-3">
                  <Phone className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h3 className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-900"} `}>WhatsApp</h3>
                  <p className={`mt-1 text-sm  ${theme==="dark" ? "text-gray-300": "text-gray-500" }  `}>
                    <a href="https://wa.me/+5358683048" target="_blank" rel="noopener noreferrer" className="hover:text-[#FFD080]">
                      +53 58683048
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={` ${ theme==="dark" ? "bg-gray-800" : "bg-white" } overflow-hidden shadow rounded-lg`}>
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-[#FF6B8B] rounded-md p-3">
                  <MapPin className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-4">
                  <h3 className={`text-lg font-medium  ${theme==="dark" ? "text-white" : "text-gray-900"} `}>Address</h3>
                  <p className={`mt-1 text-sm ${theme==="dark" ? "text-gray-300 " : "text-gray-500"} `}>
                    Havana,City
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-12 ${theme === "dark" ? "bg-gray-800" : "bg-white"} shadow rounded-lg overflow-hidden`}>
          <div className="px-4 py-5 sm:p-6 relative">
            <h3 className={` ${theme === "dark" ? "text-white" : "text-gray-900"} text-lg font-medium  `}>Send us a message</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
      <div>
        <label
          htmlFor="name"
          className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="subject"
            autoComplete="name"
            {...register('subject', { required: true })}
            className={`py-3 px-4 block w-full shadow-sm border focus:ring-[#40CFA4] focus:border-[#40CFA4] rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
          />
          {errors.name && <span className="text-red-500">Name is required</span>}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          Email
        </label>
        <div className="mt-1">
          <input
            type="email"
            id="to"
            autoComplete="email"
            {...register('to', { required: true })}
            className={`py-3 px-4 block w-full shadow-sm focus:ring-[#40CFA4] focus:border-[#40CFA4] border rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
          />
          {errors.email && <span className="text-red-500">Email is required</span>}
        </div>
      </div>

      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
        >
          Message
        </label>
        <div className="mt-1">
          <textarea
            id="text"
            rows={4}
            {...register('text', { required: true })}
            className={`py-3 px-4 block w-full shadow-sm focus:ring-[#40CFA4] focus:border-[#40CFA4] border rounded-md ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300"}`}
          ></textarea>
          {errors.message && <span className="text-red-500">Message is required</span>}
        </div>
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#40CFA4] hover:bg-[#40CFA4]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40CFA4]"
        >
          Send Message
          <Send className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
          
          </form>

          {isPending && (
            <div className='flex justify-center items-center w-full h-full absolute pointer-events-none bg-opacity-40 bg-white top-0 left-0'>
                <Spiner />
            </div>
          )}



          </div>
        </div>

        <div className="mt-12 flex justify-center space-x-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#40CFA4]">
            <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" aria-hidden="true" />
            </a>


          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFD080]">
            <span className="sr-only">GitHub</span>
            <GitHub className="h-6 w-6" aria-hidden="true" />
          </a>
        </div>
      </div>
        {isSuccess && (
          <SuccessNotification reset={reset} />
        )}

        {isError && (
            <ErrorNotification reset={reset} />
        )}

    </div>
  )
}

