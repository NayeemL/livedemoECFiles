import React from 'react';

export default function CustomerDetails({customerName, customerAddress, gstin, length, width, depth, purpose}) {
  return (
    <div className='bg-white'>
    <div className='mt-4 text-left bg-white'>
    <h5 className="font-bold text-left bg-gray-300 px-2 p-1 py-2">
          Proposal For :
    </h5>
    <section className="px-3 mt-3 mb-3 flex flex-column items-start justify-end bg-white">
            <h2 className="text-2xl uppercase font-bold mb-1 leading-3">
              {customerName}
            </h2>
            <span className="pt-1">{customerAddress}</span>
            <span>
              <b>{gstin}</b>
            </span>
            <span className="leading-7">
              L:{length} W:{width} D:{depth}
            </span>
            {/* <span>{purpose}</span> */}
          </section>
  </div>
  </div>
  )
}
