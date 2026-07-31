const STORAGE_KEY = "ganus_advisory_history";

export const ADVISORY_UPDATED_EVENT = "advisory-updated";

const dispatchUpdate = () => {

    window.dispatchEvent(
        new Event(ADVISORY_UPDATED_EVENT)
    );

};

export const getAdvisoryHistory = () => {

    try {

        const history = JSON.parse(

            localStorage.getItem(STORAGE_KEY)

        );

        return Array.isArray(history)

            ? history

            : [];

    } catch {

        return [];

    }

};

export const saveAdvisoryHistory = (history) => {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(history)

    );

    dispatchUpdate();

};

export const addAdvisoryHistory = (record) => {

    const history = getAdvisoryHistory();

    const newRecord = {

        id: crypto.randomUUID(),

        createdAt: new Date().toISOString(),

        ...record,

    };

    history.unshift(newRecord);

    saveAdvisoryHistory(history);

    return newRecord;

};

export const clearAdvisoryHistory = () => {

    localStorage.removeItem(STORAGE_KEY);

    dispatchUpdate();

};

export const getAdvisoryDashboard = () => {

    const history = getAdvisoryHistory();

    const orientations = history.filter(

        item => item.type === "orientation"

    );

    const drafts = history.filter(

        item => item.type === "draft-created"

    );

    return {

        totalOrientations:

            orientations.length,

        totalDrafts:

            drafts.length,

        latestOrientations:

            orientations.slice(0, 5),

        latestDrafts:

            drafts.slice(0, 5),

    };

};