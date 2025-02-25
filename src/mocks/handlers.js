import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('http://localhost:3000/api/1.0/themes/get-themes', () => {
    // No need to stringify JSON.

    return HttpResponse.json([
      {
        _id: 1,
        themeName: 'strawberry oasis',
        layout: { color: { background: '#0a1c3d' } },
        button: {
          color: {
            textColor: 'rgb(102, 198, 223)',
            borderColor: '1px solid rgba(95, 177, 202, 0.2)',
            backgroundColor: 'rgba(45, 50, 90, 0.2)',
            hoverBorderColor: 'rgb(133, 223, 226)',
          },
        },
        home: {
          color: {
            headerColor: '#cba2ea',
            subheaderColor: '#91d2f4',
            profileBorder: '1px solid rgb(102, 196, 255)',
          },
          font: {
            headerFont: 'Bebas-Neue',
            subheaderFont: 'Akira',
          },
        },
        postList: {
          color: {
            titleColor: '#cba2ea',
            borderColor: '1px solid rgb(102, 196, 255)',
          },
        },
        newArticle: {
          color: {
            formFieldColor: '#1c2a2e',
            formInputTextColor: 'rgb(90, 214, 236)',
            formFieldActiveColor: 'rgba(90, 214, 236, 0.2)',
            formFocusBorderColor: '2px solid rgb(45, 119, 117)',
          },
        },
        mainNav: {
          color: {
            textColor: '#3abfe4',
            activeTextColor: '#f389ee',
            activeBorderColor: '#3abfe4',
          },
        },
        auth: {
          color: {
            labelColor: '#B2FAFF',
            formFieldColor: 'rgba(20, 30, 40, 0.2)',
            formInputTextColor: '#DBAFFC',
            placeholderTextColor: '#DBAFFC',
            errorMessageTextColor: '#969596',
            formFocusBorderColor: '',
            formBackgroundColor: '#2868C6',
          },
        },
      },
      {
        _id: 2,
        themeName: 'snow',
        layout: { color: { background: '#a4b5c3' } },
        button: {
          color: {
            textColor: 'rgb(133, 233, 226)',
            borderColor: '1px solid rgba(180, 235, 232)',
            hoverBorderColor: 'rgb(133, 233, 226)',
            backgroundColor: 'rgba(39, 27, 24, 0.2)',
          },
        },
        home: {
          color: {
            headerColor: '#3d3146',
            subheaderColor: '#344a55',
            profileBorder: '1px solid rgba(180, 235, 232)',
          },
          font: {
            headerFont: "['Bebas-Neue', 'sans-serif']",
            subheaderFont: "['Akira', 'sans-serif']",
          },
        },
        postList: {
          color: {
            titleColor: '#3d3146',
            borderColor: '1px solid #3d3146',
          },
        },
        newArticle: {
          color: {
            formFieldColor: '#1c2a2e',
            formInputTextColor: 'rgba(180, 235, 232)',
            formFieldActiveColor: 'rgba(180, 235, 232, 0.2)',
            formFocusBorderColor: '2px solid rgba(180, 235, 232)',
          },
        },
        mainNav: {
          color: {
            textColor: '#3d3146',
            activeTextColor: 'rgba(180, 235, 232)',
            activeBorderColor: 'rgba(180, 235, 232)',
          },
        },
        auth: {
          color: {
            labelColor: '#3B2F44',
            formFieldColor: '#D9D9D9',
            formInputTextColor: 'rgba(180, 235, 232)',
            placeholderTextColor: '#3B2F44',
            errorMessageTextColor: '#969596',
            formFocusBorderColor: '#969696',
            formBackgroundColor: '#EAE1DC',
          },
        },
      },
    ]);
  }),

  http.post('http://localhost:3000/api/1.0/auth/sign-up', () => {}),
];
