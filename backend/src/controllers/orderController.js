let inMemoryOrders = [
  {
    id: "ORD-9281",
    customerName: "Sanjay Deshmukh",
    phone: "9822114455",
    city: "Pune",
    items: [
      { name: "Authentic Hand-Pounded Godaa Masala", quantity: 2, price: 180 },
      { name: "Puneri Crispy Bhakarwadi", quantity: 1, price: 120 }
    ],
    totalAmount: 480,
    status: "Delivered",
    paymentMethod: "UPI",
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

export const createOrder = async (req, res) => {
  try {
    const { customerName, phone, address, city, pincode, items, totalAmount, paymentMethod } = req.body;

    if (!customerName || !phone || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Missing required order fields' });
    }

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      phone,
      address: `${address}, ${city} - ${pincode}`,
      city,
      items,
      totalAmount,
      status: 'Confirmed',
      paymentMethod: paymentMethod || 'UPI',
      createdAt: new Date().toISOString()
    };

    inMemoryOrders.unshift(newOrder);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAnalytics = async (req, res) => {
  const totalRevenue = inMemoryOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  res.json({
    success: true,
    analytics: {
      totalRevenue,
      totalOrders: inMemoryOrders.length,
      activeProductsCount: 10,
      outOfStockCount: 0
    },
    recentOrders: inMemoryOrders
  });
};
