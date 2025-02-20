export function SecurePin(pin) {
  const regex = /^\d{6}$/;
  if (!regex.test(pin)) return false; // 숫자 6자리가 아닐 경우 false

  // 연속된 숫자 또는 같은 숫자가 반복되는 경우 차단
  if (
    /^(?:012345|123456|234567|345678|456789|567890|987654|876543|765432|654321|543210)$/.test(
      pin,
    )
  )
    return false;
  if (/^(\d)\1{5}$/.test(pin)) return false; // 같은 숫자가 6번 반복되는 경우 (예: 111111, 222222)

  return true;
}

console.log(SecurePin("123456")); // ❌ false (연속된 숫자)
console.log(SecurePin("111111")); // ❌ false (같은 숫자 반복)
console.log(SecurePin("938271")); // ✅ true (안전한 비밀번호)
