import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Return Policy</h1>

      <h2 className="text-xl font-semibold mb-3">General Policy</h2>
      <p className="mb-4">
        At Easy Parts Hub, we strive to provide our customers with the highest
        quality salvage car parts from multiple trusted vendors. To ensure
        complete satisfaction, we have established the following return policy.
        Please read carefully as certain parts have unique terms and conditions,
        and specific vendor policies apply.
      </p>

      <h2 className="text-xl font-semibold mb-3">Return Eligibility</h2>
      <ol className="list-decimal list-inside mb-4">
        <li>
          <strong>Timeframe:</strong> Returns must be initiated within 30 days
          from the date of delivery.
        </li>
        <li>
          <strong>Condition:</strong> Items must be returned in their original
          condition, unused, and with all original packaging and documentation.
        </li>
        <li>
          <strong>Proof of Purchase:</strong> A valid receipt or proof of
          purchase is required for all returns.
        </li>
        <li>
          <strong>Authorization:</strong> Prior authorization is required for
          all returns. Please contact our customer service team to obtain a
          Return Merchandise Authorization (RMA) number.
        </li>
      </ol>

      <h2 className="text-xl font-semibold mb-3">Return Process</h2>
      <ol className="list-decimal list-inside mb-4">
        <li>
          <strong>Request an RMA:</strong> Contact our customer service team via
          email or phone to request an RMA number. Provide your order number,
          the item(s) you wish to return, and the reason for the return.
        </li>
        <li>
          <strong>Packaging:</strong> Securely package the item(s) in their
          original packaging, including all accessories, documentation, and any
          free gifts received with the purchase.
        </li>
        <li>
          <strong>Shipping:</strong> Clearly mark the RMA number on the outside
          of the package and ship the item(s) to the address provided by our
          customer service team. Customers are responsible for return shipping
          costs unless the return is due to our error or a defective product.
        </li>
        <li>
          <strong>Inspection and Refund:</strong> Once received, the returned
          item(s) will be inspected. If approved, a refund will be processed to
          your original payment method within 10 business days. Shipping charges
          are non-refundable.
        </li>
      </ol>

      <h2 className="text-xl font-semibold mb-3">
        Unique Terms and Conditions
      </h2>
      <p className="mb-4">
        Certain parts have unique return terms and conditions due to their
        nature or specific vendor policies. These terms are as follows:
      </p>
      <ol className="list-decimal list-inside mb-4">
        <li>
          <strong>Electrical Components:</strong> Electrical parts (e.g., ECUs,
          sensors) are non-returnable once installed. They must be returned
          uninstalled and in their original packaging.
        </li>
        <li>
          <strong>Body Parts:</strong> Body parts (e.g., bumpers, fenders) must
          be inspected upon delivery. Any damage must be reported within 48
          hours to be eligible for a return.
        </li>
        <li>
          <strong>Custom Orders:</strong> Custom or special-order items are
          non-returnable unless defective or incorrectly supplied.
        </li>
        <li>
          <strong>Used Parts:</strong> Used parts must be returned in the same
          condition as received. Parts showing signs of installation or
          modification are non-returnable.
        </li>
      </ol>

      <h2 className="text-xl font-semibold mb-3">Vendor Policies</h2>
      <p className="mb-4">
        Many of our products are sourced from multiple vendors, each with their
        own return policies. These policies are outlined alongside the product
        description on our website. It is crucial to review the vendor-specific
        policies before making a purchase. By purchasing from Easy Parts Hub,
        you agree to abide by these policies.
      </p>

      <h2 className="text-xl font-semibold mb-3">Non-Returnable Items</h2>
      <p className="mb-4">The following items are non-returnable:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Items marked as "Final Sale"</li>
        <li>Gift cards</li>
        <li>Downloadable software products</li>
        <li>Items without an RMA number</li>
        <li>Items returned without original packaging and documentation</li>
      </ul>

      <h2 className="text-xl font-semibold mb-3">Damaged or Defective Items</h2>
      <p className="mb-4">
        If you receive a damaged or defective item, please contact our customer
        service team within 48 hours of delivery. We will arrange for a
        replacement or a full refund, including return shipping costs.
      </p>

      <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
      <p className="mb-4">
        For any questions regarding our return policy, or to initiate a return,
        please contact our customer service team at:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Email: [Customer Service Email]</li>
        <li>Phone: [Customer Service Phone Number]</li>
        <li>Hours: [Customer Service Hours]</li>
      </ul>

      <p>
        Thank you for choosing Easy Parts Hub. We value your business and strive
        to ensure your complete satisfaction with every purchase.
      </p>
    </div>
  );
};

export default ReturnPolicy;
