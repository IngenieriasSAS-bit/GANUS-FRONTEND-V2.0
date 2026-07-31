export const formatRelativeTime = (date) => {

    if (!date) {

        return "Sin fecha";

    }

    const now = Date.now();

    const value = new Date(date).getTime();

    const diff = Math.floor((now - value) / 1000);

    if (diff < 60) {

        return "Hace unos segundos";

    }

    if (diff < 3600) {

        const minutes = Math.floor(diff / 60);

        return `Hace ${minutes} minuto${minutes !== 1 ? "s" : ""}`;

    }

    if (diff < 86400) {

        const hours = Math.floor(diff / 3600);

        return `Hace ${hours} hora${hours !== 1 ? "s" : ""}`;

    }

    if (diff < 604800) {

        const days = Math.floor(diff / 86400);

        return `Hace ${days} día${days !== 1 ? "s" : ""}`;

    }

    if (diff < 2592000) {

        const weeks = Math.floor(diff / 604800);

        return `Hace ${weeks} semana${weeks !== 1 ? "s" : ""}`;

    }

    const months = Math.floor(diff / 2592000);

    if (months < 12) {

        return `Hace ${months} mes${months !== 1 ? "es" : ""}`;

    }

    const years = Math.floor(months / 12);

    return `Hace ${years} año${years !== 1 ? "s" : ""}`;

};