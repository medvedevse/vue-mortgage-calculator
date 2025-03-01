export interface IMortgageData {
	bank_name: string;
	term_min: number;
	term_max: number;
	rate_min_secondary: number;
	rate_min_new_building: number;
	rate_min_house: number;
	payment_min: number;
	payment_max: number;
}

export interface LoanResponse {
	monthlyPayment: string;
	totalLoanAmount: string;
	totalInterest: string;
	totalCost: string;
	payOffDate: string;
	paymentSchedule: PaymentSchedule[];
}

export interface PaymentSchedule {
	year: string;
	month: string;
	date: string;
	principal: string;
	interest: string;
	remainingBalance: string;
}
