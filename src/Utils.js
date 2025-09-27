const shorten = (str, max)=>{
    return str.length > max ? str.slice(0, max) + "…" : str;
}

const scroll_to_top = (smooth = false) => {
    if (typeof window !== "undefined" && window.scrollTo) {
        try {
            window.scrollTo({ top: 0, left: 0, behavior: smooth ? "smooth" : "auto" });
        } catch {
            window.scrollTo(0, 0);
        }
    }
};

const format_date = (date)=>{
      var formatted;
      if(date != null)
      {
        let month = date.getMonth() + 1;
        month = month > 9 ? month : "0" + month;
        let day = date.getDate();
        day = day > 9 ? day : "0" + day;

        formatted = date.getFullYear() + "-" + month + "-" + day;
      }
      return formatted;
}

const render_overview_paragraphs = (text)=> {
    if(!text) {
        return [];
    }

    // If it already has \n, treat as manually formatted
    if(text.includes('\n')) {
        return text
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map((line, index) => <p key={index}>{line}</p>);
    }

    // Otherwise split on end-of-sentence punctuation
    const split_text = text
        .split(/(?<=[.?!])\s+(?=[A-Z])/)
        .map(s => s.trim())
        .filter(s => s.length > 0);

    return split_text.map((line, index) => <p key={index}>{line}</p>);
};

const render_bio_paragraphs = (text) => {
    if(!text) {
        return [];
    }

    return text
        .split(/\n\s*\n/) // only split on double newlines or paragraph breaks
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map((line, index) => <p key={index}>{line}</p>);
};

export default {
    shorten,
    scroll_to_top,
    format_date,
    render_overview_paragraphs,
    render_bio_paragraphs
}

