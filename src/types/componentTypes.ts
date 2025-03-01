// props
export interface IAmountDifferenceProps {
	amountDiffText: string;
	amountDiff: number;
}

export interface IMortgageDetailProps {
	detailValue: number;
	detailName: string;
	detailClass?: string;
}

export interface ILinkComponentProps {
	propertyPrice: string;
	maxPropertyPrice: string;
	contribution: string;
	rate: string;
	period: string;
	montlyPropertyTax: string;
}

export interface IFooterComponentProps {
	footerText: string;
}

export interface IInputComponentProps {
	nameProps: string;
	idProps: string;
	modelProps: number;
	forProps: string;
	labelNameProps: string;
}

export interface IMorgageResultProps {
	rateProps: number;
	periodProps: number;
	propertyPriceProps: number;
	paymentProps: number;
	contributionProps: number;
	maxPropertyPriceProps: number;
}

export interface IPageIntroProps {
	headerText: string;
	introText: string;
}

export interface IPressButtonProps {
	text: string;
	func?: () => void;
}

export interface IRangeComponentProps {
	labelForProps: string;
	labelNameProps: string;
	outputForProps: string;
	outputNameProps: string;
	inputNameProps: string;
	inputIdProps: string;
	inputMinProps: string;
	inputMaxProps: string;
	modelProps: number;
	rangeClass?: string;
}

export interface IRefinanceFormProps {
	formHeader: string;
	debtModel: number;
	debtLabel: string;
	contributionModel: number;
	contributionLabel: string;
	dueDateModel: number;
	dueDateLabel: string;
}

export interface IUnbordingLinkProps {
	linkHref: string;
	linkTitle: string;
}

// emits
export interface IInputComponentEmits {
	(e: 'inputEmit', value: number): void;
}

export interface IMorgageFormEmits {
	(e: 'rate', value: number): void;
	(e: 'period', value: number): void;
	(e: 'propertyPrice', value: number): void;
	(e: 'payment', value: number): void;
	(e: 'contribution', value: number): void;
	(e: 'maxPropertyPrice', value: number): void;
}

export interface IRangeComponentEmits {
	(e: 'rangeEmit', value: number): void;
}

export interface IRateListEmits {
	(e: 'rate', value: number): void;
}

export interface IRefinanceFormEmits {
	(e: 'debtEmit', value: number): void;
	(e: 'contributionEmit', value: number): void;
	(e: 'dueDateEmit', value: number): void;
}
