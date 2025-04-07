import React from 'react';

const Features = () => {
  const features = [
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/4212/4212257.png', // Example shipping icon
      title: 'Fast Shipping',
      description: 'Shipped in 1-3 Days',
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/7132/7132913.png', // Example returns icon
      title: 'Free Returns',
      description: 'Free 7 Days Return',
    },
    {
      icon: 'https://cdn-icons-png.flaticon.com/512/6993/6993594.png', // Example payment icon
      title: 'Secure Payments',
      description: 'Stripe Payment Gateway',
    },
    {
      icon: 'https://static.vecteezy.com/system/resources/thumbnails/000/351/948/small/3__2825_29.jpg', // Example support icon
      title: 'Customer Support',
      description: 'Phone and Email',
    },
  ];

  return (
    <div className="flex justify-between items-center lg:mx-64 m-6  bg-gray-50 py-6 rounded-md shadow  ">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center px-4 border-r last:border-none"
        >
          <img
            src={feature.icon}
            alt={feature.title}
            className="w-12 h-12 mb-2"
          />
          <h3 className="font-semibold text-gray-900">{feature.title}</h3>
          <p className="text-sm text-gray-500">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
