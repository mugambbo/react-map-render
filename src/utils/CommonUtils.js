import { v4 as uuid } from 'uuid';

const CommonUtils = {
    getPoints: (pointsParams) => {
        try {
            const pointsArr = pointsParams? pointsParams.split('|'): [];
            const points = pointsArr.map(point => {
                const location = point.split(',');
                const lat = location[0], lng = location[1], title = location[2];
                return {
                    _id: uuid(),
                    lat: Number(lat),
                    lng: Number(lng),
                    title: String(title),
                    name: String(title),
                    iconUrl: '/location_icon1.svg'
                }
            });
            
            return points;
        } catch(err){
            console.log("Error extracting points: "+err);
            return [];
        }
    },
    getMapType: (mapType = 'roadmap') => {
        const mapTypeId = mapType.toLowerCase();
        const mapTypes = ['roadmap', 'terrain', 'satellite', 'hybrid'];
        return mapTypes.indexOf(mapTypeId) >= 0? mapTypeId: mapTypes[0];
    }
}

export default CommonUtils;