declare module 'react-big-calendar' {
  import { ComponentType } from 'react';

  export interface Event {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: any;
  }

  export interface CalendarProps {
    localizer: any;
    events: Event[];
    startAccessor?: string | ((event: Event) => Date);
    endAccessor?: string | ((event: Event) => Date);
    defaultView?: string;
    views?: any;
    style?: React.CSSProperties;
    [key: string]: any;
  }

  export const Calendar: ComponentType<CalendarProps>;
  export function momentLocalizer(momentInstance: any): any;
}
