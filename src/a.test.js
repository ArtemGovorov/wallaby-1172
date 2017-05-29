jest.unmock('keycloak');
import * as Keycloak from 'keycloak';

it('should work', () => {
  expect(Keycloak).toBeDefined();
})