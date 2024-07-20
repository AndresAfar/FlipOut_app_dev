import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
            <p className="text-sm">
            Powered by <a href="https://github.com/AndresAfar" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">AndresAfar</a>
            </p>
            <p className="mt-2 text-xs">
            More information about me and my projects can be found on my <a href="https://andresalfonso.com/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">personal website</a>.
            </p>
        </div>
    </footer>
  )
}

export {Footer}