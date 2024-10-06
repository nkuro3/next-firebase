import dayjs, { ManipulateType } from 'dayjs';
import ja from 'dayjs/locale/ja';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import minMax from 'dayjs/plugin/minMax';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(advancedFormat).locale(ja);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(weekOfYear);
dayjs.extend(minMax);

dayjs.tz.setDefault('Asia/Tokyo');

export default dayjs;

export type { ManipulateType };
