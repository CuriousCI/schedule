import type  Building  from "./Building";
import type  Subject  from "./Subject";
import type  Teacher  from "./Teacher";

export default interface Class {
	subject?: Subject;
	teacher?: Teacher;
	building?: Building;
	from: string;
	to: string;
	duration: number;
}
