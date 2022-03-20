const DATE_REGEXES = [
    // hyphen-separated
    /[0-9]{2}-[0-9]{2}-[0-9]{4}/,
    /[0-9]{4}-[0-9]{2}-[0-9]{2}/,
    // slash-separated
    /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/,
    /[0-9]{4}\/[0-9]{2}\/[0-9]{2}/
];

const DATE_VALID_FORMATS = {
    // hyphen-separated
    MM_DD_YYYY: 'mm-dd-yyyy',
    DD_MM_YYYY: 'dd-mm-yyyy',
    YYYY_MM_DD: 'yyyy-mm-dd',
    // slash-separated
    MM__DD__YYYY: 'mm/dd/yyyy',
    DD__MM__YYYY: 'dd/mm/yyyy',
    YYYY__MM__DD: 'yyyy/mm/dd',
};

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export {
    DATE_REGEXES,
    DATE_VALID_FORMATS,
    EMAIL_REGEX
}