// Mock data para productos ficticios
export const products = [
  {
    id: 1,
    title: "Smartphone Último Modelo - 256GB",
    image: "/images/smartphone.jpg",
    price: 299999,
    originalPrice: 399999,
    tags: ["tecnología", "smartphone", "celular", "android"],
    discount: 25
  },
  {
    id: 2,
    title: "Notebook Gaming Alta Performance",
    image: "/images/laptop.jpg",
    price: 899999,
    originalPrice: 1199999,
    tags: ["computación", "gaming", "laptop", "notebook"],
    discount: 25
  },
  {
    id: 3,
    title: "Auriculares Bluetooth Profesionales",
    image: "/images/headphones.jpg",
    price: 49999,
    originalPrice: 79999,
    tags: ["audio", "auriculares", "bluetooth", "música"],
    discount: 37
  },
  {
    id: 4,
    title: "Smart TV 55\" 4K Ultra HD",
    image: "/images/tv.jpg",
    price: 449999,
    originalPrice: 599999,
    tags: ["televisión", "smart tv", "4k", "entretenimiento"],
    discount: 25
  },
  {
    id: 5,
    title: "Cafetera Automática Espresso",
    image: "/images/coffee-machine.jpg",
    price: 89999,
    originalPrice: 119999,
    tags: ["electrodomésticos", "café", "cocina", "espresso"],
    discount: 25
  },
  {
    id: 6,
    title: "Bicicleta Eléctrica Urbana",
    image: "/images/bike.jpg",
    price: 199999,
    originalPrice: 249999,
    tags: ["deportes", "bicicleta", "eléctrica", "transporte"],
    discount: 20
  },
  {
    id: 7,
    title: "Reloj Inteligente Deportivo",
    image: "/images/smartwatch.jpg",
    price: 79999,
    originalPrice: 99999,
    tags: ["tecnología", "reloj", "deportes", "fitness"],
    discount: 20
  },
  {
    id: 8,
    title: "Cámara Digital Profesional",
    image: "/images/camera.jpg",
    price: 599999,
    originalPrice: 799999,
    tags: ["fotografía", "cámara", "profesional", "digital"],
    discount: 25
  }
];

export const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(price);
};

export const calculateInstallments = (price) => {
  const installmentPrice = Math.ceil(price / 12);
  return `12x $${installmentPrice.toLocaleString('es-AR')} sin interés`;
};