import S from 'skylake'

class Support {

    static init () {
        if (S.Sniffer.isIEolderThan11 || S.Sniffer.isSafariOlderThan8) {
            S.Dom.html.className = 'old-browser'
        }

        if (S.Sniffer.isMobile) {
            S.Dom.body.className = 'is-mobile'
        }
    }

}

export default Support
