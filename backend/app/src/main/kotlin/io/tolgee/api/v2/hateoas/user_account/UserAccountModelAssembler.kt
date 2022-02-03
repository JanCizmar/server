package io.tolgee.api.v2.hateoas.user_account

import io.tolgee.configuration.tolgee.TolgeeProperties
import io.tolgee.dtos.Avatar
import io.tolgee.model.UserAccount
import io.tolgee.security.controllers.UserController
import io.tolgee.service.UserAccountService
import org.springframework.hateoas.server.mvc.RepresentationModelAssemblerSupport
import org.springframework.stereotype.Component

@Component
class UserAccountModelAssembler(
  private val tolgeeProperties: TolgeeProperties
) : RepresentationModelAssemblerSupport<UserAccount, UserAccountModel>(
  UserController::class.java, UserAccountModel::class.java
) {
  override fun toModel(entity: UserAccount): UserAccountModel {
    val avatar = getAvatarPaths(entity)

    return UserAccountModel(
      id = entity.id,
      username = entity.username,
      name = entity.name,
      emailAwaitingVerification = entity.emailVerification?.newEmail,
      avatar = avatar
    )
  }

  private fun getAvatarPaths(entity: UserAccount): Avatar? {
    return entity.avatarHash?.let { hash ->
      val paths = UserAccountService.getAvatarPaths(hash)
      getAvatarPaths(paths)
    }
  }

  private fun getAvatarPaths(paths: Avatar) = Avatar(
    tolgeeProperties.fileStorageUrl + "/" + paths.large,
    tolgeeProperties.fileStorageUrl + "/" + paths.thumbnail
  )
}
