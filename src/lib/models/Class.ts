import type  Building  from "./Building";
import type  Subject  from "./Subject";
import type  Teacher  from "./Teacher";

export default interface Class {
	subject: Subject;
	teacher: Teacher;
	building: Building;
	from: Date;
	to: Date;
}

export function duration(_class: Class): number {
return Math.abs(_class.to.getTime() - _class.from.getTime()) / 36e5;
}