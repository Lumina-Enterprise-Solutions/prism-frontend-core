export const getFromLS = (key: string) => {
    if (typeof window !== 'undefined') {
      try {
        const ls = localStorage.getItem('dashboard-layout');
        return ls ? JSON.parse(ls)[key] : undefined;
      } catch (e) {
        console.error(e);
      }
    }
  };
  
export const saveToLS = (key: string, value: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dashboard-layout', JSON.stringify({ [key]: value }));
    }
  };

export const defaultLayouts = {
    lg: [
      { i: 'overview1', x: 0, y: 0, w: 4, h: 2 },
      { i: 'overview2', x: 4, y: 0, w: 4, h: 2 },
      { i: 'overview3', x: 8, y: 0, w: 4, h: 2 },
      { i: 'chart', x: 0, y: 2, w: 8, h: 6 },
      { i: 'sidecard1', x: 8, y: 2, w: 4, h: 3 },
      { i: 'sidecard2', x: 8, y: 5, w: 4, h: 3 },
    ],
  };
  