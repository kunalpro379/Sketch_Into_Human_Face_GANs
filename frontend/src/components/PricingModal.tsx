import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PricingModal({ isOpen, onClose }: PricingModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-8 w-full max-w-2xl">
          <Dialog.Title className="text-2xl font-bold mb-6">
            Upgrade Your Plan
          </Dialog.Title>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Free</h3>
              <p className="text-3xl font-bold mb-4">$0<span className="text-sm text-gray-500">/month</span></p>
              <ul className="space-y-2 mb-6">
                <li>✓ 2 images per month</li>
                <li>✓ Basic features</li>
                <li>✓ Community support</li>
              </ul>
              <button className="w-full py-2 px-4 border border-indigo-600 text-indigo-600 rounded-lg">
                Current Plan
              </button>
            </div>

            <div className="border-2 border-indigo-600 rounded-lg p-6 relative">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-sm rounded-bl-lg">
                Popular
              </div>
              <h3 className="text-xl font-semibold mb-2">Pro</h3>
              <p className="text-3xl font-bold mb-4">$9<span className="text-sm text-gray-500">/month</span></p>
              <ul className="space-y-2 mb-6">
                <li>✓ 50 images per month</li>
                <li>✓ Advanced features</li>
                <li>✓ Priority support</li>
              </ul>
              <button className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg">
                Upgrade to Pro
              </button>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Premium</h3>
              <p className="text-3xl font-bold mb-4">$29<span className="text-sm text-gray-500">/month</span></p>
              <ul className="space-y-2 mb-6">
                <li>✓ Unlimited images</li>
                <li>✓ All features</li>
                <li>✓ 24/7 support</li>
              </ul>
              <button className="w-full py-2 px-4 border border-indigo-600 text-indigo-600 rounded-lg">
                Upgrade to Premium
              </button>
            </div>
          </div>

          <Dialog.Close className="absolute top-4 right-4">
            <X className="h-6 w-6" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}