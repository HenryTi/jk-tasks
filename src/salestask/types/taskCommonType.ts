import { Schema, UiSchema } from 'tonva';

export interface TaskCommonType {
    caption: string;
    icon: any;
    schema: Schema;
    uiSchema: UiSchema;
    completSchema: Schema;
    completuiSchema: UiSchema;
}
