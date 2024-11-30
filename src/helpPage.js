//פונקציה שמקבלת סכום וסוג 
//אם הסוג שווה לדולר אז זה יהפוך הכל לתצוגה של דולר כולל חישוב מתאים
//ואם זה שקל אז זה יחזיר את התצוגה הרגילה עם סימן של שקל
//כי בעיקרון הכל נשמר בשקלים במאחורי הקלעים
export function ShekelToDollar(sumShekel, propCoin) {

    if (propCoin.type == "shekel")
        return `₪${parseInt(sumShekel).toLocaleString()}`

    const result = (sumShekel / propCoin.dollarRate).toFixed();

    return `$${parseFloat(result).toLocaleString()}`
}




//פונקציה שמקבלת תאריך ומחזירה מחרוזת של ההפרש בין התאריך שהתקבל 
// לתאריך הנוכחי בהפרש של ימים ואם אין אז שעות ואם אין אז דקות
export function LastTime(date) {
    const now = new Date();
    const dateOther = new Date(date);
    const days = now.getDate() - dateOther.getDate()
    const hours = now.getHours() - dateOther.getHours()
    const minutes = now.getMinutes() - dateOther.getMinutes()
    let timeString = ""

    if (days > 0)
        timeString = `${days} ימים`;
    else if (hours > 0)
        timeString = `${hours} שעות`;
    else
        timeString = `${minutes} דקות`;

    return timeString
}


// אפונקציה שבודקת אם זה שם תקיןשמכילה לפחות 2 אותיות בעברית או באנגלית
export function isTrueName(str) {
    const regex = /^[א-תa-zA-Z].*[א-תa-zA-Z]$/;
    return regex.test(str);
}


//פונקציה לבדיקה אם הכניסו מספר
export function isNumber(value) {
    return !isNaN(value);
}






