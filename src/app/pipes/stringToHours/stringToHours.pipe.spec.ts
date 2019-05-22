import { StringToHoursPipe } from './stringToHours.pipe';

describe('StringToHoursPipe', () => {
  it('create an instance', () => {
    const pipe = new StringToHoursPipe();
    expect(pipe).toBeTruthy();
  });

  it('regular time', () => {
    const pipe = new StringToHoursPipe();
    expect(pipe.transform({hours: 12, minutes: 12})).toEqual('12:12');
  });
  it('time with zeros', () => {
    const pipe = new StringToHoursPipe();
    expect(pipe.transform({hours: 2, minutes: 2})).toEqual('02:02');
  });
});
