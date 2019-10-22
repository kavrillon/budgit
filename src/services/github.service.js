import netlify from 'netlify-auth-providers';

export async function authWithGitHub() {
  return new Promise((resolve, reject) => {
    var authenticator = new netlify({
      site_id: '848adba0-29a8-45b5-bea6-b8a6d46cf173'
    });
    authenticator.authenticate(
      { provider: 'github', scope: 'public_repo,read:org,read:user' },
      function(err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
}
