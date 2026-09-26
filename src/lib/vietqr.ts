/**
 * VietQR quick generator
 */
export function getVietQRUrl({
  amount,
  orderCode,
  customerName,
}: {
  amount: number;
  orderCode: string;
  customerName?: string;
}): string {
  const bankId = process.env.NEXT_PUBLIC_BANK_ID || "MB";
  const accountNo = process.env.NEXT_PUBLIC_ACCOUNT_NO || "0941668405";
  const accountName = encodeURIComponent(
    process.env.NEXT_PUBLIC_ACCOUNT_NAME || "TRAM CHANH DA LAT"
  );
  const description = encodeURIComponent(`TRAM ${orderCode}`);

  return `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${amount}&addInfo=${description}&accountName=${accountName}`;
}
