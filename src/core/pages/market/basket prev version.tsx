import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/core/components/ui/radio-group";

// Exemple de panier fictif
const mockCart = [
  {
    id: 1,
    name: "Produit 1",
    price: 29.99,
    quantity: 2,
    image: "https://via.placeholder.com/80",
  },
  {
    id: 2,
    name: "Produit 2",
    price: 15.5,
    quantity: 1,
    image: "https://via.placeholder.com/80",
  },
];

function Basket() {
  const [consignee, setConsignee] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("visa");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [holderName, setHolderName] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const total = mockCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function validateCardNumber(cardNumber: string) {
    // Luhn algorithm
    const sanitized = cardNumber.replace(/\D/g, "");
    if (sanitized.length < 13 || sanitized.length > 19) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = sanitized.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitized.charAt(i), 10);
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }

  function validateExpiryDate(expiry: string) {
    // Format attendu: "YYYY-MM"
    if (!/^\d{4}-\d{2}$/.test(expiry)) return false;
    const [year, month] = expiry.split("-").map(Number);
    if (month < 1 || month > 12) return false;
    const now = new Date();
    const expiryDate = new Date(year, month - 1, 1);
    // Expire à la fin du mois
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    return expiryDate > now;
  }

  function validateSecurityCode(code: string) {
    // 3 ou 4 chiffres
    return /^\d{3,4}$/.test(code);
  }

  function validateHolderName(name: string) {
    // Au moins 2 mots, lettres et espaces uniquement
    return (
      /^[A-Za-zÀ-ÿ\s'-]{3,}$/.test(name.trim()) &&
      name.trim().split(" ").length >= 2
    );
  }

  function handleConfirm(e: React.FormEvent) {
    e.preventDefault();

    if (!validateCardNumber(cardNumber)) {
      alert("Invalid card number.");
      return;
    }
    if (!validateExpiryDate(expiryDate)) {
      alert("Invalid expiry date.");
      return;
    }
    if (!validateSecurityCode(securityCode)) {
      alert("Invalid security code.");
      return;
    }
    if (!validateHolderName(holderName)) {
      alert("Invalid card holder name.");
      return;
    }

    setConfirmed(true);
  }

  return (
    <div className="max-w-2xl mx-auto my-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basket</CardTitle>
        </CardHeader>
        <CardContent>
          {mockCart.length === 0 ? (
            <p>Your basket is empty.</p>
          ) : (
            <ul className="space-y-4">
              {mockCart.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div>
                      {item.quantity} × ${item.price}
                    </div>
                  </div>
                  <div className="font-bold">
                    {(item.price * item.quantity).toFixed(2)} €
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
        <CardFooter className="justify-end">
          <div className="text-lg font-bold">Total: ${total.toFixed(2)}</div>
        </CardFooter>
      </Card>

      <form id="payment_form" onSubmit={handleConfirm}>
        <Card>
          <CardHeader>
            <CardTitle>Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="address">Consignee</Label>
            <Input
              id="consignee"
              value={consignee}
              onChange={(e) => setConsignee(e.target.value)}
              required
              placeholder="John Doe"
              className="mt-2 mb-3"
            />
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="1 Elm Street, New York"
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={payment}
              onValueChange={setPayment}
              className="flex flex-row  mb-3"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="visa" id="card" />
                <Label htmlFor="visa">Visa</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="mastercard" id="paypal" />
                <Label htmlFor="mastercard">Mastercard</Label>
              </div>
              <div className="flex items-center gap-2 ">
                <RadioGroupItem value="amex" id="crypto" />
                <Label htmlFor="amex">American Express</Label>
              </div>
            </RadioGroup>
            <Label htmlFor="card_number">Card Number</Label>
            <Input
              id="card_number"
              onChange={(e) => setCardNumber(e.target.value)}
              required
              placeholder="XXXX XXXX XXXX XXXX"
              className="mt-2 mb-3"
            />
            <Label htmlFor="expiry_date">Expiry Date</Label>
            <Input
              type="month"
              id="expiry_date"
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              placeholder="YYYY-MM"
              className="mt-2 mb-3"
            />
            <Label htmlFor="csv">Security Code</Label>
            <Input
              id="csv"
              onChange={(e) => setSecurityCode(e.target.value)}
              required
              placeholder="XXX"
              className="mt-2 mb-3"
            />
            <Label htmlFor="holder">Holder Name</Label>
            <Input
              id="holder"
              onChange={(e) => setHolderName(e.target.value)}
              required
              placeholder="John Doe"
              className="mt-2 mb-3"
            />
          </CardContent>
        </Card>

        <div className="flex justify-center mt-6">
          <Button type="submit" className="w-48">
            Order and pay
          </Button>
        </div>
      </form>

      {confirmed && (
        <Card className="mt-6 border-green-500">
          <CardContent>
            <div className="text-green-600 font-bold text-lg text-center">
              Payment confirmed.
              <br />
              Thank you for your order.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
export default Basket;
