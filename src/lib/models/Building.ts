export default interface Building {
	code: string;
	room: string;
	map: string;
}

export const buildings: { [key: string]: string } = {
	RM0181L: 'Aula 1L RM018-E01PTEL013',
	RM0182L: 'Aula 2L RM018-E01PTEL026',
	RM0183L: 'Aula 3L RM018-E01PTEL025',
	RM0189L: 'Aula 9L RM018-E01P03L011',
	RM115: 'Aula G50 RM115-E01P03L001',
	CU032: 'Aula I edificio Caglioti - CU032-E01PTEL001',
	RM02515: 'Aula Informatica 15 RM025-E01PTELO24',
	RM025: 'Aula Informatica 17 RM025-E01PTEL01',
	RM111: 'Aula Magna - Edificio RM111-E01PTEL001 (Regina Elena Ed. C)',
	RM113: 'Aula T1 RM113-E01PTEL001 (Regina Elena Ed. E)',
	CU045: 'Aula T1 CU045-E01PTEL001 (Città Univ.)',
	CU046: 'Aula T2 CU046-E01PTEL001 (Città Univ.)'
};