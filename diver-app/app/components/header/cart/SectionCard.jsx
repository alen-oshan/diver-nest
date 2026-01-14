import React from 'react'
import { Trash2, Minus, Plus } from 'lucide-react'
import CartDateSelector from './CartDateSelector';
import { updateQuantity, removeItem, updateDate } from './CartUtil';

const SectionCard = ({ arrItems, setCartItems, total, section }) => {
  const handleUpdateQuantity = (id, change) => {
    setCartItems(items => updateQuantity(items, id, change));
  };

  const handleRemoveItem = (id) => {
    setCartItems(items => removeItem(items, id));
  };

  const handleUpdateDate = (id, field, value) => {
    setCartItems(items => updateDate(items, id, field, value));
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-[#205781] mb-2 border-b-2 border-[#98D2C0] pb-1">
        {section}
      </h3>
      {arrItems.length === 0 ? (
        <p className="text-gray-500 italic text-sm">No {section} in cart</p>
      ) : (
        <div className="space-y-2">
          {arrItems.map(item => (
            <div key={item.id} className="bg-gray-50 rounded p-2.5 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm text-gray-900 flex-1 pr-2">{item.name}</h4>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              
              <CartDateSelector 
                section={section}
                updateDate={handleUpdateDate}
                item={item}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 bg-white rounded border border-gray-300 px-1.5 py-0.5">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, -1)}
                    className="text-[#4F959D] hover:text-[#205781] transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, 1)}
                    className="text-[#4F959D] hover:text-[#205781] transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">${item.price} each</p>
                  <p className="text-sm font-bold text-[#205781]">${item.price * item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 pt-2 border-t border-gray-300">
        <div className="flex justify-between items-center">
          <span className="font-bold text-sm text-gray-700">{section} Total:</span>
          <span className="font-bold text-lg text-[#205781]">${total}</span>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;