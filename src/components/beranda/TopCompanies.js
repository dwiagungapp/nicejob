import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const companies = [
  {
    image: 'https://marcopolis.net/images/stories/indonesia-report/2016/companies/Bank_Central_Asia.jpg',
  },
  {
    image: 'https://marcopolis.net/images/stories/indonesia-report/2016/companies/sampoerna.jpg',
  },
  {
    image: 'https://marcopolis.net/images/stories/indonesia-report/2016/companies/Telkom_Indonesia.jpg',
  },
  {
    image: 'https://marcopolis.net/images/stories/indonesia-report/2016/companies/unilever.jpg',
  },
  {
    image: 'https://marcopolis.net/images/stories/indonesia-report/2016/companies/Astra-Internasional.jpg',
  },
  {
    image: 'https://marcopolis.net/images/stories/indonesia-report/2016/companies/Bank-Rakyat-Indonesia.jpg',
  },
  {
    image: 'https://investinasia.id/blog/wp-content/uploads/2023/05/indofood-logo.webp',
  },
  {
    image: 'https://s3.amazonaws.com/cdn.designcrowd.com/blog/100-Famous-Brand%20Logos-From-The-Most-Valuable-Companies-of-2020/samsung-logo.png',
  },
  {
    image: 'https://s3.amazonaws.com/cdn.designcrowd.com/blog/100-Famous-Brand%20Logos-From-The-Most-Valuable-Companies-of-2020/microsoft-logo.png',
  },
  {
    image: 'https://s3.amazonaws.com/cdn.designcrowd.com/blog/100-Famous-Brand%20Logos-From-The-Most-Valuable-Companies-of-2020/nike-logo.png',
  },
  // Tambahkan daftar perusahaan lainnya di sini
];

const TopCompanies = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="flex justify-center">
      <div className="w-full">
        <h1 className="text-3xl font-semibold text-center my-4 mt-10">Top Companies</h1>
        <div className="m-8">
          <Slider {...settings}>
            {companies.map((company, index) => (
              <div className="m-4" key={index}>
                <img
                  src={company.image}
                  alt={`Company ${index + 1}`}
                  className="w-32 h-32 object-contain"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default TopCompanies;