import type  Building  from "./Building";
import type  Subject  from "./Subject";
import type  Teacher  from "./Teacher";

export interface Slot {
	subject: Subject;
	teacher: Teacher;
	building: Building;
	from: Date;
	to: Date;
}