package io.tolgee.service

import io.tolgee.model.ModelWithAvatar
import org.springframework.stereotype.Service
import java.awt.Dimension
import java.io.InputStream
import java.security.MessageDigest
import javax.xml.bind.DatatypeConverter

@Service
class AvatarService(
  private val fileStorageService: FileStorageService,
  private val imageUploadService: ImageUploadService
) {
  fun storeAvatarFiles(avatar: InputStream, userAccount: ModelWithAvatar): String {
    val avatarBytes = avatar.readAllBytes()
    val large = prepareAvatar(avatarBytes, Dimension(200, 200))
    val thumb = prepareAvatar(avatarBytes, Dimension(50, 50))
    val idByteArray = "$userAccount-${userAccount.id}---".toByteArray()
    val bytesToHash = idByteArray + large
    val hashBinary = MessageDigest.getInstance("SHA-256").digest(bytesToHash)
    val hash = DatatypeConverter.printHexBinary(hashBinary)
    val (largePath, thumbnailPath) = UserAccountService.getAvatarPaths(hash)
    fileStorageService.storeFile(largePath, large)
    fileStorageService.storeFile(thumbnailPath, thumb)
    return hash
  }

  private fun prepareAvatar(avatarBytes: ByteArray, dimension: Dimension) =
    imageUploadService
      .prepareImage(avatarBytes.inputStream(), 1f, dimension)
      .toByteArray()
}
