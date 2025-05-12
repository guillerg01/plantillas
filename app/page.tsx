import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Form Templates
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Create, manage and use beautiful form templates with ease
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/plantillas" className="group">
            <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors duration-200">
                  Create Template
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  Design and create new form templates with our intuitive
                  builder
                </p>
              </div>
            </div>
          </Link>

          <Link href="/plantillas" className="group">
            <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mb-4">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-green-500 transition-colors duration-200">
                  Use Templates
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  Browse and use existing templates for your forms
                </p>
              </div>
            </div>
          </Link>

          <Link href="/plantillas" className="group">
            <div className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mb-4">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors duration-200">
                  Manage Templates
                </h3>
                <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
                  Edit, organize and manage your form templates
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-16">
          <div className="relative">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-gray-50 dark:bg-gray-900 text-lg font-medium text-gray-900 dark:text-white">
                Features
              </span>
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Customizable Fields
              </h4>
              <p className="text-gray-500 dark:text-gray-300">
                Create forms with various field types including text, select,
                checkbox, and more
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Responsive Design
              </h4>
              <p className="text-gray-500 dark:text-gray-300">
                Forms that look great on any device, from mobile to desktop
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Easy to Use
              </h4>
              <p className="text-gray-500 dark:text-gray-300">
                Intuitive interface for creating and managing form templates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
