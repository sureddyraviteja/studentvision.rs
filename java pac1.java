public class PrimeNumbers {
    public static void main(String[] args) {
        System.out.println("Prime numbers from 1 to 50 are:");
        for (int i = 1; i <= 50; i++) {
            if (isPrime(i)) {
                System.out.print(i + " ");
            }
        }
    }

    // Method to check if a number is prime
    public static boolean isPrime(int n) {
        if (n <= 1) return false; // 1 is not a prime number
        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
}
