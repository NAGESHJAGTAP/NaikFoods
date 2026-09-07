import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  ArrowLeft, 
  Truck, 
  Package, 
  CheckCircle, 
  Clock, 
  MapPin, 
  AlertCircle, 
  RefreshCw, 
  PhoneCall, 
  ShieldCheck,
  Check
} from 'lucide-react';

const ORDER_STEPS = [
  { key: 'Pending', label: 'Order Placed', desc: 'Order received and awaiting confirmation' },
  { key: 'Confirmed', label: 'Confirmed', desc: 'Payment verified & ingredients scheduled for milling' },
  { key: 'Packed', label: 'Packed & Sealed', desc: 'Aroma-sealed in food-grade pouch with quality check' },
  { key: 'Shipped', label: 'Dispatched', desc: 'Handed over to courier hub in Pune/Kolhapur' },
  { key: 'Out for Delivery', label: 'Out for Delivery', desc: 'Courier agent is on the way to your address' },
  { key: 'Delivered', label: 'Delivered', desc: 'Package delivered safely' }
];

const OrderTracking = () => {
  const { orderId } = useParams();
  const { authFetch } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTrackingInfo();
  }, [orderId]);

  const fetchTrackingInfo = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await authFetch(`/api/orders/${orderId}/tracking`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Unable to retrieve tracking info.');
      }
      const orderObj = data.order || {
        id: data.tracking?.orderId || orderId,
        status: data.tracking?.currentStatus || 'Pending',
        estimatedDelivery: data.tracking?.estimatedDelivery,
        statusHistory: data.tracking?.statusHistory || [],
        address: data.tracking?.shippingAddress || 'Pune, Maharashtra',
        customerName: 'Amit Naik',
        city: 'Pune',
        items: [],
        totalAmount: 0
      };
      setOrder(orderObj);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-stone-50 text-stone-500 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-amber-700" />
        <p className="text-sm font-medium">Tracking shipment status...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-2xl">
          <AlertCircle className="w-10 h-10 mx-auto mb-3" />
          <h2 className="text-xl font-bold font-serif mb-2">Tracking Not Available</h2>
          <p className="text-sm mb-6">{error || 'Unable to find tracking information for this order.'}</p>
          <Link
            to="/account/orders"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-xl text-sm font-bold shadow-md shadow-brand-500/20 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  const isCancelled = order.status === 'Cancelled';

  // Determine current step index in ORDER_STEPS
  let currentStepIdx = ORDER_STEPS.findIndex((s) => s.key.toLowerCase() === order.status.toLowerCase());
  if (order.status === 'Processing') currentStepIdx = 1; // Map Processing to Confirmed/Preparing
  if (currentStepIdx === -1) currentStepIdx = 0;

  const estDeliveryFormatted = order.estimatedDelivery
    ? new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : 'Within 3-5 business days';

  const trackingNumber = `NF-EXP-${order.id.replace('ORD-', '')}-MH`;

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Back Link */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link
              to="/account/orders"
              className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold font-serif text-stone-900">
                Live Shipment Tracking
              </h1>
              <p className="text-xs text-stone-500">Order #{order.id}</p>
            </div>
          </div>
          <Link
            to={`/account/orders/${order.id}`}
            className="text-xs font-bold text-brand-600 hover:text-brand-700"
          >
            View Full Order Details
          </Link>
        </div>

        {/* Live Tracking Card */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden p-6 sm:p-8 space-y-8">
          {/* Estimated Delivery Banner */}
          {!isCancelled ? (
            <div className="bg-gradient-to-r from-brand-700 via-brand-600 to-emerald-700 text-white rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md shadow-brand-500/15">
              <div>
                <span className="text-xs uppercase font-bold text-brand-100 tracking-wider">
                  {order.status === 'Delivered' ? 'Delivery Completed' : 'Estimated Delivery Time'}
                </span>
                <p className="text-2xl font-extrabold font-serif mt-0.5">
                  {order.status === 'Delivered' ? 'Delivered' : estDeliveryFormatted}
                </p>
                <p className="text-xs text-brand-50/90 mt-1">
                  Carrier: <strong>BlueDart / Delhivery Express</strong> &bull; AWB: <span className="font-mono">{trackingNumber}</span>
                </p>
              </div>
              <div className="px-3.5 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-xs font-bold border border-white/20">
                Status: {order.status}
              </div>
            </div>
          ) : (
            <div className="bg-red-50 border border-red-200 text-red-700 p-5 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-base">This order was cancelled</h4>
                <p className="text-xs mt-0.5">If you were charged, a full refund will be credited within 3-5 business days.</p>
              </div>
            </div>
          )}

          {/* Step Timeline */}
          {!isCancelled && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-6">
                Shipment Progress
              </h3>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-brand-200 space-y-8 ml-3">
                {ORDER_STEPS.map((step, idx) => {
                  const isDone = idx < currentStepIdx || (idx === currentStepIdx && order.status === 'Delivered');
                  const isCurrent = idx === currentStepIdx && order.status !== 'Delivered';
                  const isUpcoming = idx > currentStepIdx;

                  // Find timestamp from statusHistory if available
                  const historyMatch = order.statusHistory?.find(
                    (h) => h.status.toLowerCase() === step.key.toLowerCase()
                  );

                  return (
                    <div key={step.key} className="relative group">
                      {/* Node Bullet */}
                      <div
                        className={`absolute -left-[35px] sm:-left-[43px] top-0.5 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                          isDone
                            ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                            : isCurrent
                            ? 'bg-brand-500 text-white ring-4 ring-brand-100 animate-pulse'
                            : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        {isDone ? (
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                        <div>
                          <h4
                            className={`font-semibold text-base ${
                              isCurrent
                                ? 'text-brand-700 font-bold'
                                : isDone
                                ? 'text-stone-900'
                                : 'text-stone-400'
                            }`}
                          >
                            {step.label}
                          </h4>
                          <p className="text-xs text-stone-500 mt-0.5 max-w-md">
                            {step.desc}
                          </p>
                        </div>

                        {historyMatch && (
                          <span className="text-[11px] text-stone-400 font-mono">
                            {new Date(historyMatch.timestamp).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Delivery Details Footer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-stone-100">
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-600" /> Destination
              </h4>
              <p className="text-sm font-bold text-stone-900">{order.customerName}</p>
              <p className="text-xs text-stone-600 mt-0.5">{order.address}</p>
              <p className="text-xs text-stone-600">{order.city} - {order.pincode}</p>
            </div>

            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-brand-600" /> Package Contents
              </h4>
              <p className="text-xs text-stone-700">
                {order.items?.length || 0} unique item(s) &bull; Total Value: <strong className="font-mono">₹{order.totalAmount}</strong>
              </p>
              <div className="mt-2 text-[11px] text-stone-500 space-y-0.5">
                {order.items?.map((it, i) => (
                  <p key={i} className="truncate">
                    &bull; {it.name} (x{it.quantity})
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Support Callout */}
          <div className="p-4 rounded-xl bg-brand-50/60 border border-brand-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3 text-stone-700">
              <PhoneCall className="w-5 h-5 text-brand-600 flex-shrink-0" />
              <span>
                Need help with your delivery or urgent rescheduling? Reach our dispatch support desk directly.
              </span>
            </div>
            <a
              href="tel:+919876543210"
              className="px-4 py-2 bg-stone-900 text-white rounded-lg font-semibold hover:bg-stone-800 transition flex-shrink-0"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
