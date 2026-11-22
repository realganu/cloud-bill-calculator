// Cloud Bill Calculator
// Improved Billing Engine

import { DISCOUNTS, PRICING } from "../data/pricing";

const roundMoney = (amount) =>
  Math.round((amount + Number.EPSILON) * 100) / 100;

// Main billing function
export function calculateBill(resources) {
  const dataTransfer = Number(resources.dataTransfer);
  const vmHours = Number(resources.vmHours);
  const numberOfVMs = Number(resources.numberOfVMs);
  const storage = Number(resources.storage);

  // Data transfer tier calculation
  const dataFirstGB = Math.min(
    dataTransfer,
    PRICING.dataTransfer.firstTierLimit
  );
  const dataSecondGB = Math.max(
    dataTransfer - PRICING.dataTransfer.firstTierLimit,
    0
  );
  const dataFirstCost = roundMoney(
    dataFirstGB * PRICING.dataTransfer.firstTierRate
  );
  const dataSecondCost = roundMoney(
    dataSecondGB * PRICING.dataTransfer.secondTierRate
  );
  const dataTransferCost = roundMoney(
    dataFirstCost + dataSecondCost
  );

  // VM tier calculation per individual VM
  const vmFirstHours = Math.min(
    vmHours,
    PRICING.vm.firstTierLimit
  );
  const vmSecondHours = Math.max(
    vmHours - PRICING.vm.firstTierLimit,
    0
  );
  const vmFirstCost = roundMoney(
    vmFirstHours *
    PRICING.vm.firstTierRate *
    numberOfVMs
  );
  const vmSecondCost = roundMoney(
    vmSecondHours *
    PRICING.vm.secondTierRate *
    numberOfVMs
  );
  const vmCost = roundMoney(
    vmFirstCost + vmSecondCost
  );

  // Storage calculation
  const storageCost = roundMoney(
    storage * PRICING.storage.rate
  );

  // Subtotal
  const subtotal = roundMoney(
    dataTransferCost + vmCost + storageCost
  );

  // Discount calculation
  const discount = DISCOUNTS.find(
    (item) => subtotal >= item.minimum
  );
  const discountRate = discount.rate;
  const discountAmount = roundMoney(
    subtotal * discountRate
  );

  // Final bill
  const total = roundMoney(
    subtotal - discountAmount
  );

  let discountReason = "No discount applicable.";
  if (discountRate === 0.10) {
    discountReason =
      "10% discount applied because subtotal is ₹500 or above.";
  } else if (discountRate === 0.05) {
    discountReason =
      "5% discount applied because subtotal is ₹250 or above.";
  }

  return {
    dataTransferCost,
    dataFirstGB,
    dataSecondGB,
    dataFirstCost,
    dataSecondCost,

    vmCost,
    vmFirstHours,
    vmSecondHours,
    vmFirstCost,
    vmSecondCost,

    storageCost,

    subtotal,
    discountRate,
    discountAmount,
    discountReason,
    total,

    totalVMHours: vmHours * numberOfVMs,
  };
}
